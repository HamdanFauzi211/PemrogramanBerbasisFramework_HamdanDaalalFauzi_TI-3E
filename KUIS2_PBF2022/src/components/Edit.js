import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      nim:'',
      nama:'',
      prodi:'',
      nohp:'',
      angkatan:'',
      status:'',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('mahasiswa').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const mahasiswa = doc.data();
        this.setState({
          key: doc.id,
          nim: mahasiswa.nim,
          nama: mahasiswa.nama,
          prodi: mahasiswa.prodi,
          nohp: mahasiswa.nohp,
          angkatan:mahasiswa.angkatan,
          status: mahasiswa.status
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({mahasiswa:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nim, nama, prodi, nohp, angkatan, status } = this.state;

    const updateRef = firebase.firestore().collection('mahasiswa').doc(this.state.key);
    updateRef.set({
      nim,
      nama,
      prodi,
      nohp,
      angkatan,
      status
    }).then((docRef) => {
      this.setState({
        key: '',
        nim:'',
        nama:'',
        prodi:'',
        nohp:'',
        angkatan:'',
        status:''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Edit Mahasiswa
            </h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
                <label for="nim">NIM:</label>
                <input type="text" class="form-control" name="nim" value={this.state.nim} onChange={this.onChange} placeholder="NIM" />
              </div>
              <div class="form-group">
                <label for="nama">Nama:</label>
                <input type="text" class="form-control" name="nama" value={this.state.nama} onChange={this.onChange} placeholder="Nama" />
              </div>
              <div class="form-group">
                <label for="prodi">Prodi:</label>
                <input type="text" class="form-control" name="prodi" value={this.state.prodi} onChange={this.onChange} placeholder="Prodi" />
              </div>
              <div class="form-group">
                <label for="nohp">No HP:</label>
                <input type="text" class="form-control" name="nohp" value={this.state.nohp} onChange={this.onChange} placeholder="NO HP" />
              </div>
              <div class="form-group">
                <label for="angkatan">Angkatan:</label>
                <input type="number" class="form-control" name="angkatan" value={this.state.angkatan} onChange={this.onChange} placeholder="Angkatan" />
              </div>
              <div class="form-group">
                <label for="status">Status:</label>
                <input type="text" class="form-control" name="status" value={this.state.status} onChange={this.onChange} placeholder="Status" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
