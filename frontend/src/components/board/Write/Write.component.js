export default {
  name: 'write',
  components: {},
  props: [],
  data () {
    return {
        // data 부분에 추가
        selectedImage: '',
        imageInfo: {},
        board:{

        }
    }
  },
  computed: {

  },
   created: function () {
     let id = this.$route.params.id;
     if(id == null || id == ""){
      return;
     }

       this.$http.defaults.headers.common['X-Access-Token'] = this.$session.get('jwt');
       this.$http.get(`/api/board/${id}`).then((response) => {

           if(response.data.token == true){
              this.boards = response.data.result;
          }

     }).catch((err) => {
       alert('게시글을 가져올 수 없습니다.');
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
    onFileChange(event) {
      const files = event.target.files;
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
    },
    goList(){
      this.$router.push('/board/list');
    },
    boardAdjust(){
    },
    leadingZeros(n, digits) {
      var zero = '';
      n = n.toString();

      if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
          zero += '0';
      }
      return zero + n;
    },
    boardSave(){
      var d = new Date();

      var s =
      this.leadingZeros(d.getFullYear(), 4) + '-' +
      this.leadingZeros(d.getMonth() + 1, 2) + '-' +
      this.leadingZeros(d.getDate(), 2) + ' ' +

      this.leadingZeros(d.getHours(), 2) + ':' +
      this.leadingZeros(d.getMinutes(), 2) + ':' +
      this.leadingZeros(d.getSeconds(), 2);
      this.board.register = this.$session.get('userInfo').id;
      this.board.registedAt = s;

      this.$http.defaults.headers.common['X-Access-Token'] = this.$session.get('jwt');
      this.$http.post('/api/board', this.board)
      .then((response) => {

          if(response.data.token == true){
              alert('글이 정상적으로 저장 되었습니다.');
              this.$router.push('/board/list')
          }

      })
      .catch((err) => {
        alert(err);
      });

      //methods > boardSave() 메소드에 추가 - post로 보내는 부분 위에 추가
      this.board.image = this.selectedImage
      this.board.imageInfo = this.imageInfo

    }
  }
}
