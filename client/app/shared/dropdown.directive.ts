import { Directive, HostBinding, HostListener } from '@angular/core';
//import { NgModule } from '@angular/core';
@Directive({
    selector: '[appDropdown]'
})
//This appDropdown would be consumed by the recipe-detail.component.html and header.component.html  
export class DropdownDirective {
    //We use the HostBinding to attach the css element class.open
    //The HostListener listen to the CLICK even so the class.open can be applied to the html object
    //class.open allows the dropdown to open up and reveal its content

    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
    constructor() { }

}
