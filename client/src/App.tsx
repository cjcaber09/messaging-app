import './App.css'
import Header from './components/layout/header'
import MessageContent from './components/layout/messagesContent'
import Sidebar from './components/layout/sideBar'

function App() {

  return (
    <>
      <section>
        <Header></Header>
      </section>
      <div className='flex mt-4 gap-4'>
        <section>
          <Sidebar />
        </section>
        <section className='flex-1'>
          <MessageContent />
        </section>
      </div>
    </>
  )
}

export default App
