import axios from 'axios';

export default class TodoService {
  constructor() {
    this.base_url = 'http://localhost:6200/';
  }

  all(callback) {
    axios.get(this.base_url)
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      console.log(err);
      callback(null);
    });
  }

  get(id, callback) {
    axios.get(`${this.base_url}/${id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch(err => {
      console.log(err);
      callback(null);
    });
  }
  
  post(targetUrl, callback) {
    axios.post(`${this.base_url}`, {targetUrl})
    .then(res => {
      callback(res);
    })
    .catch(err => {
      console.log(err);
      callback();
    });
  }

  update(data, id, callback) {
    axios.put(`${this.base_url}/${id}`,
    {desc: data})
    .then(res => {
      console.log('Updated');
      callback();
    })
    .catch(res => {
      callback();
    });
  }

  delete(id, callback) {
    axios.delete(`${this.base_url}/${id}`)
    .then(res => {
      callback();
    })
    .catch(res => {
      console.log('Error Deleting');
      callback();
    });
  }
}