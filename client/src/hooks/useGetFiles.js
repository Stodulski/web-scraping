import { toast } from 'sonner'
import api from '../axiosConfig'
import { useState, useEffect, useRef } from 'react'

export const useGetFiles = () => {
  const [files, setFiles] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef(null)

  const fetchFiles = async () => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    try {
      const response = await api.get(`/csv/?page=${page}&limit=30`)
      const newFiles = response.data

      setFiles(prevFiles => {
        const existingIds = new Set(prevFiles.map(f => f._id)) // o filename
        const filtered = newFiles.filter(f => !existingIds.has(f._id))
        return [...prevFiles, ...filtered]
      })

      setHasMore(newFiles.length > 0)
    } catch (error) {
      toast.error('Error fetching files')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage(prev => prev + 1)
      }
    })

    const currentLoader = loaderRef.current
    if (currentLoader) observer.observe(currentLoader)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [hasMore, isLoading])

  return { files, setFiles, fetchFiles, loaderRef }
}
