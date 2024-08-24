export const manifest = {
    icon: 'defaultIcon',
    name: 'Test Plugin',
    id: '@test/plugin',
    versions: ['0.0.1'],
    description: 'Test Plugin',
    createdAt: new Date('2024-08-17').getTime() + '',
    updatedAt: new Date().getTime() + '',
    author: 'wenzi7777',
    copyright: '(c)2024 wenzi7777, licensed under the MIT License.',
    requestedAPIs: ['showDialog', 'ACEV2Log'],
    website: 'https://acev2.test.plugin/',
    trigger: {
        receiveHandler: false,
        matches: ['*']
    }
}