import {Link} from 'react-router-dom'

const NoteFound = () => {
  return (
    <div className='text-[50px] font-[700]'>
      Страница не найдена, вернуться на <Link to='/products'>Главную</Link>
    </div>
  )
}

export default NoteFound 
