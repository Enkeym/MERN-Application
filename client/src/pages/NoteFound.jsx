import {Link} from 'react-router-dom'

// Компонент для отображения страницы "Страница не найдена"
const NoteFound = () => {
  return (
    <div className='text-[50px] font-[700]'> {/* Стили текста */}
      {/* Ссылка для перехода на главную страницу */}
      Страница не найдена, вернуться на <Link to='/products'>Главную</Link>
    </div>
  )
}

export default NoteFound 
