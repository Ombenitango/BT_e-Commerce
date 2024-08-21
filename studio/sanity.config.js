import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'Dashboard',
  // TODO!: replace SANITY_STUDIO_PROJECT_ID in .env with a valid project ID from sanity
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',

  plugins: [deskTool(), visionTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})
