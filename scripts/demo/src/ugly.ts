const  palette={bg:"#001a22",teal:'#007972',green:"#b4fa72"}
export function pick( name:string ){return palette[name as keyof typeof palette]}
