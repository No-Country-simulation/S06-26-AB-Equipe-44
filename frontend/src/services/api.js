import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
})

export const consultarDados = async (consulta, filtros = {}, idioma = 'pt') => {
  const response = await api.post('/dados', { consulta, filtros, idioma })
  return response.data
}

export const obterMapa = async () => {
  const response = await api.get('/mapa')
  return response.data
}

export default api