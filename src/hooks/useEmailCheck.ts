import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../supabaseConfig'

const checkEmailExists = async (email: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('userinfo')
    .select('email')
    .eq('email', email)

  if (error) {
    console.error('Supabase Error', error)
    return false
  }

  return data.length > 0
}

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
