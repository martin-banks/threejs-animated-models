<template>
  <div>
    <h1>Loading model</h1>
    <div class="threeModel"></div>

  </div>
</template>

<script>
import modelFile from '@/assets/man_BaseMesh_Anim-x.js'

export default {
  name: 'model-man',
  props: {},
  components: {},
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      model: null,
      mtl: null,
      mixer: null,
      clock: null,
    }
  },
  methods: {
    init () {
      this.$el.appendChild(this.renderer.domElement)
    },
    animate () {
      var delta = this.clock.getDelta()
      if (this.mixer !== null) {
        this.mixer.update(delta)
      }
      this.renderer.render(this.scene, this.camera)
      this.renderer.gammaInput = true
      this.renderer.gammaOutput = true
      requestAnimationFrame(this.animate)
    }
  },
  computed: {},

  mounted () {
    this.$nextTick(() => {
      this.clock = new THREE.Clock()
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        75, // view angle
        window.innerWidth / 2 / (window.innerHeight / 2), // ratio
        0.1, // ???
        10000 // ?? depth ??
      )
      this.scene.add(this.camera)
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setPixelRatio(window.devicePixels)
      this.renderer.setClearColor('#333')
      this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)

      // Add lights
      const ambient = new THREE.AmbientLight('#fff', 0.2) // soft white light
      this.scene.add(ambient)

      const fillLight = new THREE.DirectionalLight('#fff', 0.5)
      fillLight.position.set(100, 50, 100)
      fillLight.castShadow = true
      this.scene.add(fillLight)

      const backLight = new THREE.DirectionalLight(0xffffff, 1)
      backLight.position.set(-50, 0, -100).normalize()
      this.scene.add(backLight)
      const loader = new THREE.GLTFLoader()
      this.model = loader.parse(
        modelFile,
        '',
        loadedModel => {
          this.gltfModel = loadedModel
          // const material = new THREE.MeshPhongMaterial( { color: 0xff5000 } )
          // this.gltfModel.scene.traverse(x => {
          //   x.material = material
          // })

          setTimeout(() => {
            this.mixer = new THREE.AnimationMixer(this.gltfModel.scene)
            this.mixer.clipAction(this.gltfModel.animations[1]).play()
            this.scene.add(this.gltfModel.scene)
            console.log('start animation')
          }, 500)
        },
        onerror => {
          console.error({ onerror })
        }
      )
      // var geometry = new THREE.BoxGeometry( 1, 1, 1 )
      // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
      // var cube = new THREE.Mesh( geometry, material )
      // this.scene.add( cube )

      // camera.position.z = 5;
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.campingFactor = 0.25
      this.controls.enableZoom = true
      this.camera.position.y = 0
      this.camera.position.x = 0
      this.camera.position.z = 5
      this.camera.rotation.x = 0
      this.camera.rotation.y = 0
      this.camera.rotation.z = 0
      this.init()
      this.animate()
      window.scene = this.scene
    })
  },
}
</script>

<style scoped lang="sass">


</style>
