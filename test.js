const { FileViewer } = components;
var app = new Vue({
    el: '#app',
    data() {
        return {
            docList: [
                {
                    "path":"https://cdn.chime.me/doc/fs/upload/2019122/22/c215b689-a3d6-4d6d-9e6b-2219fdc85552/test.pdf",
                    "name":"test.pdf",
                    "type":"pdf",
                },
                {
                    "path":"https://cdn.chime.me/doc/fs/upload/2019115/10/673a8a2f-37b1-4755-97ed-66e280564d15/movie.ogg",
                    "name":"movie.ogg",
                    "type":"ogg",
                },
                {
                    "path":"https://cdn.chime.me/doc/fs/upload/2019115/8/0a49c6be-7ba8-40f9-80d2-fbe6ca19473c/timg.jpeg",
                    "name":"timg.jpeg",
                    "type":"jpeg",
                },
                {
                    "path":"https://cdn.chime.me/doc/fs/upload/2019123/15/14214cf7-3d01-4440-aa9e-33083d9778f8/test.docx",
                    "name":"test.docx",
                    "type":"doc",
                }
            ]
        }
    },
    template: `<div><FileViewer :file="docList[0]"></FileViewer></div>`,
    components: { FileViewer }
});