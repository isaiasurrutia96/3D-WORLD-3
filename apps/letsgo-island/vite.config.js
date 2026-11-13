import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
export default defineConfig({root,base:'./',server:{host:'127.0.0.1',port:5275},build:{outDir:fileURLToPath(new URL('../../dist/island',import.meta.url)),emptyOutDir:true,target:'es2020'}});
