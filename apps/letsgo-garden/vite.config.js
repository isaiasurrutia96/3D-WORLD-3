import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';

export default defineConfig({
 root:fileURLToPath(new URL('.',import.meta.url)),
 base:'./',
 server:{host:'127.0.0.1',port:5276},
 build:{outDir:fileURLToPath(new URL('../../dist/garden',import.meta.url)),emptyOutDir:true,target:'es2020'},
});
