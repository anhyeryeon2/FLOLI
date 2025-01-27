import { useQuery } from '@tanstack/react-query'
import { checkEmailExists } from '@/apis/signup'

export const useEmailCheck = (email: string) => {
  const { isLoading, isError, refetch } = useQuery({
    queryKey: ['checkEmail', email],
    queryFn: async () => checkEmailExists(email),
    enabled: false,
    retry: false
  })

  const checkEmail = async () => {
    const { data } = await refetch()
    return data
  }

  return { isLoading, isError, checkEmail }
}
