import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('Web5')
  }
}
