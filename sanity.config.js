import {defineConfig} from 'sanity'
import {schemaTypes} from './sanity_ecommerce/schemas'

export default defineConfig({
  name: 'default',
  title: 'E-Commerce Store',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6g8f6wwt',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [],

  schema: {
    types: schemaTypes,
  },
  
  basePath: '/studio',
})
