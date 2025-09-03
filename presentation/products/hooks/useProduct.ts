import { updateCreateProduct } from "@/core/products/actions/create-update-product.action"
import { getProductById } from "@/core/products/actions/get-product-by-id.action"
import { Product } from "@/core/products/interfaces/product.interface"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Alert } from "react-native"

export const useProduct = (productId: string) => {
  
  const productQuery = useQuery({
    queryKey: ['products', productId ],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  // Mutacion
  const productMutation = useMutation({
    mutationFn: async ( data: Product) => updateCreateProduct(data),

    onSuccess: (data: Product) => {
      //TODp Invalidar products queries
      Alert.alert('Producto guardado correctamente')
    },

    onError: (error) => {
      Alert.alert(error.message, `${error.name} ${error.cause} ${error.stack}`)
    }
  })

  // Mantener el ID del producto en caso de ser uno nuevo
  
  return {
    productQuery,
    productMutation
  }
}
