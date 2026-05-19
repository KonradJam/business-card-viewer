export const SAMPLES = [
    { 
        id: 0, 
        label: 'Sample 1', 
        tags: [
            ['paper', 'mat'],
            ['foil', 'mat'],
            ['uv', 'uv'],
            ['emboss', false]
        ],
        files: {
            front: '/samples/1/Sample-1-front.pdf',
            back: '/samples/1/Sample-1-back.pdf',
            frontUV: '/samples/1/Sample-1-frontUV.pdf',
            backUV: '/samples/1/Sample-1-backUV.pdf',
            frontEmboss: null
        }
    },
    {
        id: 1,
        label: 'Sample 2',
        tags: [
            ['paper', 'mat'],
            ['foil', false],
            ['uv', false],
            ['emboss', 'emboss']
        ],        
        files: {
            front: '/samples/2/Sample-2-front.pdf',
            back: '/samples/2/Sample-2-back.pdf',
            frontUV: null,
            backUV: null,
            frontEmboss: '/samples/2/Sample-2-frontEmboss.pdf'
        }
    },
    {
        id: 2,
        label: 'Sample 3',
        tags: [
            ['paper', 'mat'],
            ['foil', 'mat'],
            ['uv', 'uv'],
            ['emboss', false]
        ],
        files: {
            front: '/samples/3/Sample-3-front.pdf',
            back: '/samples/3/Sample-3-back.pdf',
            frontUV: '/samples/3/Sample-3-frontUV.pdf',
            backUV: '/samples/3/Sample-3-backUV.pdf',
            frontEmboss: null
        }
    },
    {
        id: 3,
        label: 'Sample 4',
        tags: [
            ['paper', 'glossy'],
            ['foil', 'glossy'],
            ['uv', false],
            ['emboss', 'emboss']
        ],
        files: {
            front: '/samples/4/Sample-4-front.pdf',
            back: '/samples/4/Sample-4-back.pdf',
            frontUV: null,
            backUV: null,
            frontEmboss: '/samples/4/Sample-4-frontEmboss.pdf'
        }
    }
];