import React from "react";

const View = () => {
  return (
    <div class="page-wrapper">
      <div class="page-content-tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="page-title-box">
                <div class="float-right">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="javascript:void(0);">Metrica</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="javascript:void(0);">Analytics</a>
                    </li>
                    <li class="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
                <h4 class="page-title">Dashboard</h4>
              </div>
            </div>
          </div>

          <div class="row"></div>

          <div class="row">
            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <h4 class="header-title mt-0">Leads And Vendors</h4>
                  <div class="">
                    <div id="liveVisits" class="apex-charts"></div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 col-lg-6">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <img
                          src="assets/images/widgets/monthly-re.png"
                          alt=""
                          height="80"
                        />
                        <div class="align-self-center">
                          <h2 class="mt-0 mb-2 font-weight-semibold">
                            $955
                            <span class="badge badge-soft-success font-11 ml-2">
                              <i class="fas fa-arrow-up"></i> 8.6%
                            </span>
                          </h2>
                          <h4 class="title-text mb-0">Monthly Revenue</h4>
                        </div>
                      </div>
                      <hr class="hr-dashed" />
                      <div class="d-flex justify-content-between bg-light p-2 mt-3 rounded">
                        <div class="align-self-center">
                          <h6 class="m-0 font-weight-semibold">Last Month</h6>
                        </div>
                        <div class="align-self-center">
                          <h4 class="m-0 font-weight-semibold font-20">
                            $3512.00
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-lg-6">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="card dash-data-card text-center">
                        <div class="card-body">
                          <div class="icon-info mb-3">
                            <i class="fab fa-facebook bg-soft-primary"></i>
                          </div>
                          <h3 class="text-dark">184k</h3>
                          <h6 class="font-14 text-dark">Followers</h6>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="card dash-data-card text-center">
                        <div class="card-body">
                          <div class="icon-info mb-3">
                            <i class="fab fa-twitter bg-soft-secondary"></i>
                          </div>
                          <h3 class="text-dark">101k</h3>
                          <h6 class="font-14 text-dark">Followers</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-4">
              <div class="card">
                <div class="card-body dash-info-carousel">
                  <h4 class="mt-0 header-title mb-4">New Leads</h4>
                  <div
                    id="carousel_2"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    <div class="carousel-inner">
                      <div class="carousel-item">
                        <div class="media">
                          <img
                            src="assets/images/users/user-1.jpg"
                            class="mr-2 thumb-lg rounded-circle"
                            alt="..."
                          />
                          <div class="media-body align-self-center">
                            <h4 class="mt-0 mb-1 title-text text-dark">
                              Important Watch
                            </h4>
                            <p class="text-muted mb-0">Python Devloper</p>
                          </div>
                        </div>
                      </div>
                      <div class="carousel-item active">
                        <div class="media">
                          <img
                            src="assets/images/users/user-2.jpg"
                            class="mr-2 thumb-lg rounded-circle"
                            alt="..."
                          />
                          <div class="media-body align-self-center">
                            <h4 class="mt-0 mb-1 title-text">
                              Wireless Headphone
                            </h4>
                            <p class="text-muted mb-0">Python Devloper</p>
                          </div>
                        </div>
                      </div>
                      <div class="carousel-item">
                        <div class="media">
                          <img
                            src="assets/images/users/user-3.jpg"
                            class="mr-2 thumb-lg rounded-circle"
                            alt="..."
                          />
                          <div class="media-body align-self-center">
                            <h4 class="mt-0 mb-1 title-text">Leather Bag</h4>
                            <p class="text-muted mb-0">Python Devloper</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      class="carousel-control-prev"
                      href="#carousel_2"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#carousel_2"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>

                  <div class="m-0">
                    <div id="apex_radialbar3" class="apex-charts"></div>
                  </div>
                  <div class="bg-light p-3 d-flex justify-content-between">
                    <div>
                      <h2 class="mb-1 font-weight-semibold">402</h2>
                      <p class="text-muted mb-0">Recent Leads</p>
                    </div>
                    <div class="img-group align-self-center">
                      <a class="user-avatar user-avatar-group" href="#">
                        <img
                          src="assets/images/users/user-6.jpg"
                          alt="user"
                          class="rounded-circle thumb-xs"
                        />
                      </a>
                      <a class="user-avatar user-avatar-group" href="#">
                        <img
                          src="assets/images/users/user-2.jpg"
                          alt="user"
                          class="rounded-circle thumb-xs"
                        />
                      </a>
                      <a class="user-avatar user-avatar-group" href="#">
                        <img
                          src="assets/images/users/user-3.jpg"
                          alt="user"
                          class="rounded-circle thumb-xs"
                        />
                      </a>
                      <a class="user-avatar user-avatar-group" href="#">
                        <img
                          src="assets/images/users/user-4.jpg"
                          alt="user"
                          class="rounded-circle thumb-xs"
                        />
                      </a>
                      <a href="" class="avatar-box thumb-xs align-self-center">
                        <span class="avatar-title bg-soft-info rounded-circle font-13 font-weight-normal">
                          +25
                        </span>
                      </a>
                    </div>
                  </div>
                  <div class="media mt-3">
                    <i
                      data-feather="globe"
                      class="align-self-center icon-lg icon-dual-primary mr-2"
                    ></i>
                    <div class="media-body align-self-center">
                      <h5 class="mt-0 mb-1">Website</h5>
                      <a href="#" class="text-primary mb-0 font-14 pr-5">
                        www.example123.com
                      </a>
                    </div>
                  </div>
                  <hr class="hr-dashed" />
                  <div class="media mt-3">
                    <i
                      data-feather="tag"
                      class="align-self-center icon-lg icon-dual-primary mr-2"
                    ></i>
                    <div class="media-body align-self-center">
                      <h5 class="mt-0 mb-1">Tags</h5>
                      <span class="badge badge-light">HTML5</span>
                      <span class="badge badge-light">Css3</span>
                      <span class="badge badge-light">Python</span>
                      <span class="badge badge-light">Flutter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <h4 class="header-title mt-0 mb-3">Leads Report</h4>
                  <div class="table-responsive">
                    <table class="table">
                      <thead class="thead-light">
                        <tr>
                          <th>Lead</th>
                          <th>Email</th>
                          <th>Phone No</th>
                          <th>Company</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>
                            <img
                              src="assets/images/users/user-10.jpg"
                              alt=""
                              class="thumb-sm rounded-circle mr-2"
                            />
                            Donald Gardner
                          </td>
                          <td>xyx@gmail.com</td>
                          <td>+123456789</td>
                          <td>Starbucks coffee</td>
                          <td>
                            {" "}
                            <span class="badge badge-md badge-soft-purple">
                              New Lead
                            </span>
                          </td>
                          <td>
                            <a href="#" class="mr-2">
                              <i class="fas fa-edit text-info font-16"></i>
                            </a>
                            <a href="#">
                              <i class="fas fa-trash-alt text-danger font-16"></i>
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <img
                              src="assets/images/users/user-9.jpg"
                              alt=""
                              class="thumb-sm rounded-circle mr-2"
                            />
                            Matt Rosales
                          </td>
                          <td>xyx@gmail.com</td>
                          <td>+123456789</td>
                          <td>Mac Donald</td>
                          <td>
                            {" "}
                            <span class="badge badge-md badge-soft-purple">
                              New Lead
                            </span>
                          </td>
                          <td>
                            <a href="#" class="mr-2">
                              <i class="fas fa-edit text-info font-16"></i>
                            </a>
                            <a href="#">
                              <i class="fas fa-trash-alt text-danger font-16"></i>
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <img
                              src="assets/images/users/user-8.jpg"
                              alt=""
                              class="thumb-sm rounded-circle mr-2"
                            />
                            Michael Hill
                          </td>
                          <td>xyx@gmail.com</td>
                          <td>+123456789</td>
                          <td>Life Good</td>
                          <td>
                            {" "}
                            <span class="badge badge-md badge-soft-danger">
                              Lost
                            </span>
                          </td>
                          <td>
                            <a href="#" class="mr-2">
                              <i class="fas fa-edit text-info font-16"></i>
                            </a>
                            <a href="#">
                              <i class="fas fa-trash-alt text-danger font-16"></i>
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <img
                              src="assets/images/users/user-7.jpg"
                              alt=""
                              class="thumb-sm rounded-circle mr-2"
                            />
                            Nancy Flanary
                          </td>
                          <td>xyx@gmail.com</td>
                          <td>+123456789</td>
                          <td>Flipcart</td>
                          <td>
                            {" "}
                            <span class="badge badge-md badge-soft-purple">
                              New Lead
                            </span>
                          </td>
                          <td>
                            <a href="#" class="mr-2">
                              <i class="fas fa-edit text-info font-16"></i>
                            </a>
                            <a href="#">
                              <i class="fas fa-trash-alt text-danger font-16"></i>
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <img
                              src="assets/images/users/user-6.jpg"
                              alt=""
                              class="thumb-sm rounded-circle mr-2"
                            />
                            Dorothy Key
                          </td>
                          <td>xyx@gmail.com</td>
                          <td>+123456789</td>
                          <td>Adidas</td>
                          <td>
                            {" "}
                            <span class="badge badge-md badge-soft-primary">
                              Follow Up
                            </span>
                          </td>
                          <td>
                            <a href="#" class="mr-2">
                              <i class="fas fa-edit text-info font-16"></i>
                            </a>
                            <a href="#">
                              <i class="fas fa-trash-alt text-danger font-16"></i>
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <img
                              src="assets/images/users/user-5.jpg"
                              alt=""
                              class="thumb-sm rounded-circle mr-2"
                            />
                            Joseph Cross
                          </td>
                          <td>xyx@gmail.com</td>
                          <td>+123456789</td>
                          <td>Reebok</td>
                          <td>
                            {" "}
                            <span class="badge badge-md badge-soft-success">
                              Converted
                            </span>
                          </td>
                          <td>
                            <a href="#" class="mr-2">
                              <i class="fas fa-edit text-info font-16"></i>
                            </a>
                            <a href="#">
                              <i class="fas fa-trash-alt text-danger font-16"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="card">
                <div class="card-body">
                  <h4 class="header-title mt-0 mb-3">Activity</h4>
                  <div class="slimscroll crm-dash-activity">
                    <div class="activity">
                      <div class="activity-info">
                        <div class="icon-info-activity">
                          <i class="mdi mdi-checkbox-marked-circle-outline bg-soft-success"></i>
                        </div>
                        <div class="activity-info-text">
                          <div class="d-flex justify-content-between align-items-center">
                            <h6 class="m-0 w-75">Task finished</h6>
                            <span class="text-muted d-block">10 Min ago</span>
                          </div>
                          <p class="text-muted mt-3">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered
                            alteration.
                            <a href="#" class="text-info">
                              [more info]
                            </a>
                          </p>
                        </div>
                      </div>

                      <div class="activity-info">
                        <div class="icon-info-activity">
                          <i class="mdi mdi-timer-off bg-soft-pink"></i>
                        </div>
                        <div class="activity-info-text">
                          <div class="d-flex justify-content-between align-items-center">
                            <h6 class="m-0 w-75">Task Overdue</h6>
                            <span class="text-muted">50 Min ago</span>
                          </div>
                          <p class="text-muted mt-3">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered
                            alteration.
                            <a href="#" class="text-info">
                              [more info]
                            </a>
                          </p>
                          <span class="badge badge-soft-secondary">Design</span>
                          <span class="badge badge-soft-secondary">HTML</span>
                        </div>
                      </div>
                      <div class="activity-info">
                        <div class="icon-info-activity">
                          <i class="mdi mdi-alert-decagram bg-soft-purple"></i>
                        </div>
                        <div class="activity-info-text">
                          <div class="d-flex justify-content-between align-items-center">
                            <h6 class="m-0 w-75">New Task</h6>
                            <span class="text-muted">10 hours ago</span>
                          </div>
                          <p class="text-muted mt-3">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered
                            alteration.
                            <a href="#" class="text-info">
                              [more info]
                            </a>
                          </p>
                        </div>
                      </div>

                      <div class="activity-info">
                        <div class="icon-info-activity">
                          <i class="mdi mdi-clipboard-alert bg-soft-warning"></i>
                        </div>
                        <div class="activity-info-text">
                          <div class="d-flex justify-content-between align-items-center">
                            <h6 class="m-0">New Comment</h6>
                            <span class="text-muted">Yesterday</span>
                          </div>
                          <p class="text-muted mt-3">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered
                            alteration.
                            <a href="#" class="text-info">
                              [more info]
                            </a>
                          </p>
                        </div>
                      </div>
                      <div class="activity-info">
                        <div class="icon-info-activity">
                          <i class="mdi mdi-clipboard-alert bg-soft-secondary"></i>
                        </div>
                        <div class="activity-info-text">
                          <div class="d-flex justify-content-between align-items-center">
                            <h6 class="m-0">New Lead Miting</h6>
                            <span class="text-muted">14 Nov 2019</span>
                          </div>
                          <p class="text-muted mt-3">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered
                            alteration.
                            <a href="#" class="text-info">
                              [more info]
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer text-center text-sm-left">
          &copy; Metrica{" "}
          <span class="text-muted d-none d-sm-inline-block float-right">
            Crafted with <i class="mdi mdi-heart text-danger"></i> by
            Themesbrand
          </span>
        </footer>
      </div>
    </div>
  );
};

export default View;
