import React from 'react'



const ProductForm = () => {
    return (
        <section class="login-block">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <form class="md-float-material form-material" action="#" method="POST">
                            <div class="auth-box card">
                                <div class="card-block">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h3 class="text-center heading">Create your BBBootstrap account. It’s free and only takes a minute.</h3>
                                        </div>
                                    </div>
                                    <div class="form-group form-primary">
                                        <input type="text" class="form-control" name="first_name" value="" placeholder="Display name" id="first_name" />
                                    </div>
                                    <div class="form-group form-primary">
                                        <input type="text" class="form-control" name="email" value="" placeholder="Email" id="email" />
                                    </div>
                                    <div class="form-group form-primary">
                                        <input type="password" class="form-control" name="password" placeholder="Password" value="" id="password" />
                                    </div>
                                    <div class="form-group form-primary">
                                        <input type="password" class="form-control" name="password_confirm" placeholder="Repeat password" value="" id="password_confirm" />
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <input type="submit" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" name="submit" value="Signup Now" />
                                            <button type="button" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">
                                                <i class="fa fa-lock"></i> Signup Now </button>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}