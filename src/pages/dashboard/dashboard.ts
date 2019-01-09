import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ServiceStorageProvider, Item } from '../../providers/service-storage/service-storage';
import { Platform, ToastController, List } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  items: Item[] = [];
  newItem: Item = <Item>{};
  updating: Boolean = false;
  private authForm: FormGroup;

  @ViewChild('mylist') mylist: List;
  constructor(
    private storageService: ServiceStorageProvider,
    private plt: Platform,
    private toastController: ToastController,
    private fb: FormBuilder) {
    this.plt.ready().then(() => {
      this.authForm = this.fb.group({
        studentID: ['', [Validators.required]],
        studentName: ['', [Validators.required]],
        email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')])],
        class: ['', [Validators.required]],
        enrollment: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]]
      });
      this.loadItems();
    });
  }

  // CREATE
  addItem() {
    if (!this.updating) {
      this.storageService.addItem(this.newItem).then(item => {
        this.newItem = <Item>{};
        this.showToast('Item added!')
        this.loadItems();
      });
    } else {
      this.update();
    }
  }

  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

  // UPDATE
  updateItem(item: Item) {
    this.newItem = item;
    this.updating = true;
  }

  update() {
    this.storageService.updateItem(this.newItem).then(() => {
      this.updating = false;
      this.newItem = {
        city: '',
        class: '',
        country: '',
        email: '',
        enrollment: '',
        studentID: null,
        studentName: ''
      }
      this.showToast('Item updated!');
      this.loadItems();
    });
  }
  // DELETE
  deleteItem(item: Item) {
    this.storageService.deleteItem(item.studentID).then(item => {
      this.showToast('Item removed!');
      this.loadItems();
    });
  }
  clear() {
    this.newItem.studentID = null;
    this.newItem.studentName = '',
      this.newItem.email = '',
      this.newItem.enrollment = '',
      this.newItem.class = '',
      this.newItem.city = '',
      this.newItem.country = ''
  };

  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}