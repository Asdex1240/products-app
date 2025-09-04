import { Size } from '@/core/products/interfaces/product.interface';
import ProductImages from '@/presentation/products/components/ProductImages';
import ThemeButtonGroup from '@/presentation/products/components/ThemeButtonGroup';
import { useProduct } from '@/presentation/products/hooks/useProduct';
import { useCameraStore } from '@/presentation/store/useCameraStore';
import MenuIconButton from '@/presentation/theme/components/MenuIconButton';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

const ProductScreen = () => {

  const { selectedImages, clearImages } = useCameraStore();

  useEffect(() => {
    return () => {
      clearImages();
    }
  }, [])
  

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery, productMutation } = useProduct(`${id}`)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>  <MenuIconButton
        icon='camera-outline'
        onPress={ () => router.push(`/camera`) }
      />
    })

  }, [])

  useEffect(() => {
    if( productQuery.data ) {
      navigation.setOptions({
        title: productQuery.data.title
      })
    }
  }, [productQuery.data])
  

  if ( productQuery.isLoading ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} />
      </View>
    )
  }

  if( !productQuery.data ) {
    return <Redirect href='/(products-app)/(home)' />
  }

  const product = productQuery.data!;
  
  return (
    <Formik
      initialValues={product}
      onSubmit={ ( productLike ) => productMutation.mutate( productLike ) }
    >
      {
        ({ values, handleSubmit, handleChange, setFieldValue }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView>
              <ProductImages images={[...values.images, ...selectedImages]} />
                <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
                  <ThemedTextInput 
                    placeholder='Titulo' 
                    style={{ marginVertical: 5 }}
                    value={values.title}
                    onChangeText={ handleChange('title') }
                  />

                  <ThemedTextInput
                    placeholder='Slug'
                    style={{ marginVertical: 5 }}
                    value={ values.slug }
                    onChangeText={ handleChange('slug') }
                  />
                  <ThemedTextInput
                    placeholder='Descripción'
                    multiline
                    numberOfLines={5}
                    style={{ marginVertical: 5 }}
                    value={ values.description }
                    onChangeText={ handleChange('description') }
                  /> 
                </ThemedView>

                <ThemedView style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  flexDirection: 'row',
                  gap: 10
                }}>

                <ThemedTextInput 
                  placeholder='Precio' 
                  style={{ flex: 1 }}
                  value={ `${values.price}` }
                  onChangeText={ handleChange('price') }
                  keyboardType='numeric'
                />
                <ThemedTextInput 
                  placeholder='Inventario' 
                  style={{ flex: 1 }}
                  value={ `${values.stock}` }
                  onChangeText={ handleChange('stock') }
                  keyboardType='numeric'
                />
              </ThemedView>

              <ThemedView style={{
                marginHorizontal: 10,
              }}>
                <ThemeButtonGroup
                  options={ [ 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL' ] }
                  selectedOptions={ values.sizes }
                  onSelect={ ( selectedSizes ) => {
                    const newSizeValue = values.sizes.includes( selectedSizes as Size )
                    ? values.sizes.filter( size => size !== selectedSizes )
                    : [ ...values.sizes, selectedSizes as Size ]
                    
                    setFieldValue('sizes', newSizeValue )
                  }}
                />

                <ThemeButtonGroup
                  options={ [ 'kids', 'men', 'women', 'unisex' ] }
                  selectedOptions={ [values.gender] }
                  onSelect={ ( selectedOption ) => setFieldValue('gender', selectedOption) }
                />
              </ThemedView>

              <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                <ThemedButton
                  icon='save-outline'
                  onPress={ () => handleSubmit() }
                >
                  Guardar
                </ThemedButton>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )
      }
    </Formik>
    
  )
}

export default ProductScreen