export default {
  name: 'modify',
  components: {},
  props: [],
  data () {
    return {
      board:{},
      //data 부분에 해당 변수 추가
      selectedImage: '',
      imageInfo: {}
    }
  },
  computed: {

  },
   created: function () {
    /* 변경된 부분  this.$route.params.id => this.$route.params.id */
     let no = this.$route.params.no;
     if(no == null || no == ""){
      return;
     }
     this.$http.get(`/api/board/read/${no}`).then((response) => {

       if(response.data.token == true){
         //create의 http.get > then 안에 해당 로직 추가
         this.selectedImage = response.data.result.imageData
         this.imageInfo.imageName = response.data.result.imageName
         this.imageInfo.imageSize = response.data.result.imageSize
         this.imageInfo.imageFormat = response.data.result.imageFormat

         this.board = response.data.result;
        }

     }).catch((err) => {
       alert('게시글을 가져올 수 없습니다.');
       this.$router.push('/board/list');
     });
   },

  beforeCreate: function () {
    if (!this.$session.exists()) {

      this.$router.push('/member/login');
    }
  },
  mounted () {

  },
  methods: {
    goList(){
      this.$router.push('/board/list');
    },
    boardAdjust(){
      //methods > boardAdjust()의 put 위에 해당 로직 추가
      this.board.image = this.selectedImage
      this.board.imageInfo = this.imageInfo

      this.$http.put('/api/board', this.board)
      .then((response) => {
          if(response.data.token == true){
              alert('글이 정상적으로 저장 되었습니다.');
              this.$router.push('/board/list')
        }
      })
      .catch((err) => {
        alert(err);
      });
    },
    // methods에 새로운 메소드 추가
    onFileChange(event) {
      const files = event.target.files || event.dataTransfer.files;
      if(!files) return;
      let image = new Image();
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        vm.selectedImage = e.target.result;
      }

      reader.readAsDataURL(files[0])
      this.imageInfo.imageName = files[0].name
      this.imageInfo.imageSize = files[0].size
      this.imageInfo.imageFormat = files[0].type
    }
  }
}
