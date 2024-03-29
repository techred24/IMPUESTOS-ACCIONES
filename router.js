import { ListView, PurchaseModalAdapter, SellModalAdapter } from "./adapter.js";
import { checkOverflow, disableScroll, getMonthsForCurrentYear } from "./main.js";
import { templateSubirArchivos } from "./template_files.js";
import { templateCalcularImpuestos } from "./template_impuestos.js";
import { createToast } from "./toast.js";

export class Router {
    constructor(routes) {
        this.routes = routes;
        // console.log(location.pathname, 'location.pathname');
        // this.navigate(location.pathname === '/index.html' ? '/' : location.pathname);
    }
    // ('/documentos')
    navigate(path) {
        this.resolve(this.routes, path);
    }
    resolve(routes, path) {
        if (routes.length) {
            const queue = [{ routes, baseUrl: '' }];

            while(queue.length) {
                const currentRoute = queue.shift();
                for (const route of currentRoute.routes || []) {
                    // if (currentRoute.baseUrl === '') 
                    const fullpath = `${currentRoute.baseUrl}/${route.path}`
                    if (fullpath === path) {
                        history.pushState(null, '', path);
                        route.action();
                        return;
                    }
                    queue.push({ routes: route.children, baseUrl: fullpath });
                }
            }
        }
    }
}

export const customRoutes = [
    // {
    //     path: '',
    //     action: () => {
    //         renderPage('<p>Página principal</p>');
    //     }
    // },
    {
        path: 'compra',
        action: () => {
            renderPage('<p>Registrar compra de acciones</p>');
        }
    },
    {
        path: 'venta',
        action: () => {
            renderPage('<p>Registrar Venta de Acciones</p>');
        }
    },
    {
        path: 'calcular',
        action: () => {
            renderPage(templateCalcularImpuestos);
        }
    },
    {
        path: 'documentos',
        action: () => {
            renderPage(templateSubirArchivos);
        }
    },
    // {
    //     path: 'documentos',
    //     action: () => {
    //         renderPage(templateSubirArchivos);
    //     },
    //     children: [
    //         {
    //             path: 'test',
    //             action: () => {
    //                 renderPage('TEST')
    //             }
    //         }
    //     ]
    // }
];

const router = new Router(customRoutes);

function renderPage(concatTemplate = '') {
    renderHTML(concatTemplate);
}
function renderHTML(html) {
    // console.log(html);
    document.getElementById('root').innerHTML = html;
}
// This function have to be executed in some button in html. Example: navigate('/documentos')
export function navigate(path) {
    router.navigate(path);
}
// document.getElementById('register-documents').addEventListener('click', () => navigate('/documentos'));
document.getElementById('calculate-taxes').addEventListener('click', () => {
    navigate('/calcular');
    const $openModalButtonPurchase = document.getElementById('selectIndexPurchase');
        const $openModalButtonSell = document.getElementById('selectIndexSell');
        
        $openModalButtonPurchase.addEventListener('click', () => {
            const adapter = new PurchaseModalAdapter(getMonthsForCurrentYear());
            ListView.showModal(adapter);
            disableScroll();
            checkOverflow();
        });
        $openModalButtonSell.addEventListener('click', () => {
            const adapter = new SellModalAdapter(getMonthsForCurrentYear());
            ListView.showModal(adapter);
            disableScroll();
            checkOverflow();
        });

        document.getElementById('sell-purchase__container').addEventListener('keypress', (event) => {
            event.preventDefault();
            if (event.target.value.includes('.') && event.key === '.') return
            let key = window.event ? event.which : event.keyCode
            if ((key >= 48 && key <= 57) || key === 46) event.target.value += event.key
            else document.querySelector('.notifications').textContent.includes('Sólo se permiten números') ? null : createToast('warning', 'Sólo se permiten números')
        });
});
document.getElementById('register-documents').addEventListener('click', () => {
    navigate('/documentos');
    const embed = document.getElementById('view-pdf');
    document.getElementById('xml-input').addEventListener('change', function (event) {
        const documentName = this.files[0].name;
        const extension = documentName.substring(documentName.lastIndexOf('.') + 1);
        if (extension !== 'xml') {
            this.value = null;
            createToast('warning', 'Seleccione un archivo con extensión xml');
        }
    });
    document.getElementById('pdf-input').addEventListener('change', function (event) {
        // console.log(document.getElementById('pdf-input').value)
        const documentName = event.target.files[0].name
        const extension = documentName.substring(documentName.lastIndexOf('.') + 1);
        // console.log(extension);
        if (extension !== 'pdf') {
            event.target.value = null
            createToast('warning', 'Seleccione un archivo con extensión pdf');
            return
        }
        let pdffile = this.files[0];
        let pdf = new Blob([pdffile], { type: pdffile.type });
        const pdfURL = URL.createObjectURL(pdf)+'#toolbar=0';
        // embed.src = pdfURL
        embed.setAttribute('src', pdfURL);
    });
});