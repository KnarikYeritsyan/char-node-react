class Utils {

  static getCurrentFriendId() {
    const [, friendId] = window.location.pathname.match(/^\/messages\/(\d+)/) || [];
    return +friendId;
  }
}

export default Utils;
