import { createToast } from "./toast";

if (window.indexedDB) {
    createToast('info', 'Inicializando base de datos del navegador');
} else {
    createToast('warning', 'El navegador no soporta indexedDB');
}