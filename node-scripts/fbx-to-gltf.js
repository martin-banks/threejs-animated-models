const convert = require('fbx2gltf')
const path = require('path')

// After conversion run through a converter to change to gltf format
// https://blackthread.io/gltf-converter/

console.log(__dirname)

// const fileName = 'man_BaseMesh_Anim'
const fileName = 'mannequin/free3DmodelFBX'

const input = path.join(__dirname, `../src/assets/${fileName}.fbx`)
const output = path.join(__dirname, `../src/assets/${fileName}.glb`)

convert(input, output, ['--khr-materials-unlit'])
.then(destPath => {
    console.log('conversion done')
    console.log(destPath)
  })
  .catch(err => {
    console.log('--- ERROR ---\n', err)
  })
