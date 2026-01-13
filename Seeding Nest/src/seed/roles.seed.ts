 const Role_LIST = [
    {name: "admin", code:"admin",role_id:""},
    {name:"user", code:"user",role_id:""},
    {name:"superAdmin", code:"superAdmin",role_id:""},
];

export const Role_LIST_WITH_UUID = Role_LIST.map(role =>({
    ...role,
    role_id: crypto.randomUUID()
}));

