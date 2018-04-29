export default {
  name: 'movie',
  components: {},
  props: [],
  //data 에 추가
  data () {
    return {
      movies : {}
    }
  },
  computed: {

  },
  // computed 밑에 추가
  created: function () {
    let apikey = '93a612ac13fd382b43fcc6721ab40513';
    console.log(apikey);
    var date = new Date();
    date.setDate(date.getDate()-1);
    date = getFormatDate(date);
    this.$http.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=`+apikey+`&targetDt=`+date).then((response) => {
        this.movies = response.data.boxOfficeResult.dailyBoxOfficeList;
      console.log(this.movies);
    }).catch((err) => {
      alert('error occur in server.');
    });

    function getFormatDate(date){
      var year = date.getFullYear();                 //yyyy
      var month = (1 + date.getMonth());             //M
      month = month >= 10 ? month : '0' + month;     // month 두자리로 저장
      var day = date.getDate();                      //d
      day = day >= 10 ? day : '0' + day;             //day 두자리로 저장
      return  year + '' + month + '' + day;
    }
  },
  mounted () {

  },
  methods: {
  }
}
