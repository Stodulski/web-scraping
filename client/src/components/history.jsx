import { HistoryItem } from './historyItem'

export const History = ({ files, setFiles, loaderRef, hasMore }) => {
  return (
    <section className='my-10 max-w-[650px]'>
      <h1 className='text-white text-2xl'>File history</h1>
      <div className='w-full flex flex-col-reverse justify-evenly items-center py-5 gap-y-5'>
        {files.length === 0 && (
          <h2 className='text-white text-lg mt-5'>No files.</h2>
        )}
        {files.map(item => (
          <HistoryItem
            setFiles={setFiles}
            files={files}
            filename={item.filename}
            id={item._id}
            key={item._id}
          />
        ))}
      </div>
      <div ref={loaderRef} className='text-white font-bold'> {hasMore ? 'Cargando...' : ''}</div>
    </section>
  )
}
