class UserInfo {
  constructor(nameData, jobData) {
    this._nameItem = document.querySelector(nameData);
    this._jobItem= document.querySelector(jobData);
  }

  getUserInfo() {
    return {
      name: this._nameItem.textContent,
      job: this._jobItem.textContent
    }
  }

  setUserInfo({ name, job }) {
    this._nameItem.textContent = name;
    this._jobItem.textContent = job;
  }
}

export default UserInfo;
