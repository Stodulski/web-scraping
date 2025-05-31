import { useDeleteFile } from '../hooks/useDeleteFile'
import { useDownloadFile } from '../hooks/useDownloadFile'

export const HistoryItem = ({ filename, id, files, setFiles }) => {
  const { deleteFile } = useDeleteFile(id, files, setFiles)
  const { downloadFile } = useDownloadFile(id, filename)
  return (
    <article className='flex max-w-[650px] w-[90vw] items-center justify-between flex-col sm:flex-row gap-y-5 '>
      <span className='text-white font-medium'>{filename}</span>
      <div className='gap-2 flex w-full sm:w-auto'>
        <a
          onClick={downloadFile}
          className='py-2 px-4 w-full sm:w-auto border-2 cursor-pointer border-white  bg-violet-100 text-violet-950 rounded-lg hover:border-purple-700 focus:ring-1 text-center focus:ring-purple-500 focus:border-purple-700 focus:outline-none'
        >
          Download
        </a>
        <button
          onClick={deleteFile}
          className='py-2 px-4 w-full sm:w-auto border-2 cursor-pointer border-white bg-violet-100 text-violet-950 rounded-lg hover:border-purple-700 focus:ring-1 focus:ring-purple-500 focus:border-purple-700 focus:outline-none'
        >
          Delete
        </button>
      </div>
    </article>
  )
}
