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
            renderPage('<p>Calcular Impuestos de Acciones</p>');
        }
    },
    {
        path: 'documentos',
        action: () => {
            renderPage('<p>Cargar Documentos</p>');
        },
        children: [
            {
                path: 'test',
                action: () => {
                    renderPage('TEST')
                }
            }
        ]
    }
];

const router = new Router(customRoutes);

function renderPage(concatTemplate = '') {
    renderHTML(concatTemplate);
}
function renderHTML(html) {
    console.log('Executing');
    document.getElementById('root').innerHTML = html;
}
// This function have to be executed in some button in html. Example: navigate('/documentos')
export function navigate(path) {
    router.navigate(path);
}
document.getElementById('register-documents').addEventListener('click', () => navigate('/documentos'));
