import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() orders: Order[]
  @ViewChild('modal') modelRef: ElementRef

  modal: MaterialInstance
  selectedOrder: Order


  constructor() {}
  ngOnInit() {}


  ngOnDestroy(){
    this.modal.destroy()
  }

  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modelRef)
  }

  selectOrder(order: Order){
      this.selectedOrder = order
    this.modal.open()
  }

  closeModal(){
    this.modal.close()
  }


  computePrice(order: Order): number {
      return order.list.reduce((total,item)=> {
        return total += item.quantity * item.cost
      }, 0)
  }
}
