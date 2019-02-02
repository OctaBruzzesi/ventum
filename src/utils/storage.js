export const loadAuth = () => {
  try {
    const authData = localStorage.getItem('auth')
    if (authData === null){
      return undefined // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
    }
    return authData // Si encontramos con exito nuestro storage lo devolvemos.
  } catch (error) {
    return undefined // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
  }
}
export const saveAuth = (state) => {
  try {
    let authData = JSON.stringify(state.toJS())
    localStorage.setItem('auth', authData)
  } catch (error) {
	// Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.    
  }
}