import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ALITOUR, DEFAULT_ROUTE } from '../../../../environments/environment';
import to from 'await-to-js';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    companyConfig = ALITOUR;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param authService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    async authenticate(): Promise<void> {
        const [error, auth] = await to(this.authService.authenticate(this.loginForm.getRawValue()).toPromise());
        if (auth) {
            if (AuthService.isAuthenticated()) {
                this.router.navigate([DEFAULT_ROUTE]);
            }
        } else {
            console.log(error, auth);
            alert('Usuario y/o contraseña incorrecta');
        }
    }

    // authenticate(): void {
    //     this.authService.authenticate(this.loginForm.getRawValue());
    //     if (AuthService.isAuthenticated()) {
    //         this.router.navigate([DEFAULT_ROUTE]);
    //     }
    // }
}
