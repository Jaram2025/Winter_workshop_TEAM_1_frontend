/*
Template: CloudBOX - Responsive Bootstrap 4 Admin Dashboard Template
Author: iqonicthemes.in
Design and Developed by: iqonicthemes.in
NOTE: This file contains the styling for responsive Template.
*/

/*----------------------------------------------
Index Of Script
------------------------------------------------

:: Tooltip
:: Fixed Nav
:: Scroll up menu
:: Magnific Popup
:: Ripple Effect
:: Sidebar Widget
:: Page Loader
:: Owl Carousel
:: Counter
:: Progress Bar
:: Page Menu
:: Close  navbar Toggle
:: Mailbox
:: chatuser
:: chatuser main
:: Chat start
:: todo Page
:: user toggle
:: Scroll up horizontal menu
:: Data tables
:: Form Validation
:: Active Class for Pricing Table
:: Flatpicker
:: Scrollbar
:: checkout
:: Datatables
:: image-upload
:: video
:: Button
:: Pricing tab
:: menu click li
:: tab sidebar back close
:: Remove collapse panel
:: Current Time

------------------------------------------------
Index Of Script
----------------------------------------------*/

(function(jQuery) {



    "use strict";

    jQuery(document).ready(function() {

        function checkAccessToken() {
            // accessToken 쿠키를 가져오기
            const accessToken = getCookie('accessToken');
        
            if (accessToken) {
              // accessToken이 있으면 로그인 상태로 리다이렉트
              console.log('accessToken found:', accessToken);
            } 
            else {
              // accessToken이 없으면 로그인 페이지로 이동
              console.log('accessToken not found.');
              window.location.href = '/login'; // 로그인 페이지로 이동
            }
        }
        
        function getCookie(name) {
        // 쿠키 가져오기
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1); // 쿠키 값 반환
            }
        }
        return null; // 쿠키가 없으면 null 반환
        }
        
        //사용자 정보 가져오기//

        function fetchUserProfile() {
            $.ajax({
                url: '/api/auth/me', // 사용자 정보를 가져오는 백엔드 API 엔드포인트
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    // API로부터 데이터를 성공적으로 받았을 때 처리
                    if (response) {
                        // 이름 업데이트
                        $('#userName').text(response.name);
    
                        // 이메일 업데이트
                        $('#userEmail').text(response.email);
                    } else {
                        console.error('No user data found');
                    }
                },
                error: function (xhr, status, error) {
                    // 에러 발생 시 처리
                    console.error('Failed to fetch user profile:', error);
                }
            });
        }
    
        // 페이지 로드 시 사용자 정보 가져오기 호출
        fetchUserProfile();

        /*----------------------------------------------------------
        사용자 정보 가져오기
        -----------------------------------------------------------*/
        function fetchUserInfo() {
            $.ajax({
                url: '/api/auth/me', // 사용자 정보를 가져오는 백엔드 API 엔드포인트
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    // API로부터 데이터를 성공적으로 받았을 때 처리
                    if (response) {
                        // First Name
                        $('#fname').val(response.first_name);
    
                        // Last Name
                        $('#lname').val(response.last_name);
    
                        // Email
                        $('#email').val(response.email);
                    } else {
                        console.error('No user data found');
                    }
                },
                error: function (xhr, status, error) {
                    // 에러 발생 시 처리
                    console.error('Failed to fetch user info:', error);
                }
            });
        }
    
        // 페이지 로드 시 사용자 정보 가져오기 호출

        /*-------------------------------------------------------
        동적 파일 목록 조회 아이콘형태태
        ------------------------------------------------------*/
        // 확장자에 따른 아이콘 URL 반환 함수
        function getFileIcon(extension) {
            const icons = {
                pdf: "../assets/images/layouts/page-7/pdf.png",
                docx: "../assets/images/layouts/page-7/docx.png",
                xlsx: "../assets/images/layouts/page-7/excel.png",
                pptx: "../assets/images/layouts/page-7/pptx.png",
                default: "../assets/images/layouts/page-7/file.png",
            };
            return icons[extension.toLowerCase()] || icons.default;
        }
        // 파일 목록을 가져와 렌더링하는 함수
        function fetchAndRenderFiles() {
            $.ajax({
                url: '/api/files', // 파일 목록을 제공하는 백엔드 API 엔드포인트
                type: 'GET', // GET 요청
                dataType: 'json', // JSON 형식으로 데이터 처리
                success: function (response) {
                    const fileList = $('#fileList');
                    fileList.empty(); // 기존 목록 제거

                    // 파일 데이터 확인
                    console.log('파일 데이터:', response);

                    // 파일이 있는 경우 렌더링
                    if (response.files && response.files.length > 0) {
                        response.files.forEach(file => {
                            // 파일 이름과 확장자를 분리
                            const fileNameParts = file.name.split('.');
                            const fileName = fileNameParts.slice(0, -1).join('.'); // 확장자를 제외한 파일 이름
                            const fileExtension = fileNameParts.pop(); // 확장자
                            const fileIcon = getFileIcon(fileExtension); // 확장자별 아이콘 가져오기

                            const fileItem = `
                                <div class="col-lg-3 col-md-6 col-sm-6">
                                    <div class="card card-block card-stretch card-height">
                                        <div class="card-body image-thumb">
                                            <div class="mb-4 text-center p-3 rounded iq-thumb">
                                                <div class="iq-image-overlay"></div>
                                                <a href="#"
                                                    data-title="${file.name}" 
                                                    data-load-file="file" 
                                                    data-load-target="#resolte-container" 
                                                    data-url="${file.path}" 
                                                    data-toggle="modal" 
                                                    data-target="#exampleModal">
                                                    <img src="${fileIcon}" class="img-fluid" alt="${file.name}">
                                                </a>
                                            </div>
                                            <h6>${file.name}</h6>
                                            <p>크기: ${formatFileSize(file.size)}</p>
                                            <p>생성일: ${new Date(file.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                            fileList.append(fileItem);
                        });
                    } else {
                        fileList.append('<p>업로드된 파일이 없습니다.</p>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('파일 목록을 가져오는데 실패했습니다.', error);
                    $('#fileList').html('<p>파일 목록을 로드하는 데 실패했습니다.</p>');
                }
            });
        }

        // 파일 크기를 포맷하는 함수
        function formatFileSize(size) {
            if (size < 1024) return `${size} B`;
            if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
            if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
            return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        }
        
        // 페이지가 로드될 때 파일 목록 가져오기

        /*-------------------------------------------------------
        동적 파일 목록 조회 목록형형
        ------------------------------------------------------*/

        // 파일 목록을 가져와 렌더링하는 함수
        function fetchAndRenderFiles2() {
            const iconClasses = {
                pdf: 'ri-file-pdf-line bg-danger',
                docx: 'ri-file-word-line bg-primary',
                xlsx: 'ri-file-excel-line bg-info',
                pptx: 'ri-file-ppt-line bg-success',
                default: 'ri-file-line bg-secondary'
            };

            $.ajax({
                url: '/api/files', // 파일 목록을 가져오는 백엔드 API
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    const tbody = $('#fileTableBody'); // ID가 fileTableBody인 <tbody> 선택
                    tbody.empty(); // 기존 내용 초기화
                    const jsonObject = JSON.parse(jsonDiconv.response.files)
                    if (response.files && response.files.length > 0) {
                        response.files.forEach(file => {
                            const fileNameParts = file.name.split('.');
                            const fileName = fileNameParts.slice(0, -1).join('.');
                            const fileExtension = fileNameParts.pop().toLowerCase();
                            const iconClass = iconClasses[fileExtension] || iconClasses.default;
                            const formattedSize = formatFileSize(file.size);
                            const formattedDate = new Date(file.created_at).toLocaleDateString();
    
                            const fileRow = `
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="icon-small ${iconClass.split(' ')[1]} rounded mr-3">
                                                <i class="${iconClass.split(' ')[0]}"></i>
                                            </div>
                                            <div 
                                                data-load-file="file" 
                                                data-load-target="#resolte-contaniner" 
                                                data-url="${file.path}" 
                                                data-toggle="modal" 
                                                data-target="#exampleModal" 
                                                data-title="${file.name}" 
                                                style="cursor: pointer;">
                                                ${file.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>Me</td>
                                    <td>${formattedDate}</td>
                                    <td>${formattedSize}</td>
                                    <td>
                                        <div class="dropdown">
                                            <span class="dropdown-toggle" id="dropdownMenuButton-${file.id}" data-toggle="dropdown">
                                                <i class="ri-more-fill"></i>
                                            </span>
                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton-${file.id}">
                                                <a class="dropdown-item delete-file" href="#" data-safe-filename="${file.path}">
                                                    <i class="ri-delete-bin-6-fill mr-2"></i>Delete
                                                </a>
                                                <a class="dropdown-item download-file" href="#" data-safe-filename="${file.path}">
                                                    <i class="ri-file-download-fill mr-2"></i>Download
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            `;
                            tbody.append(fileRow);
                        });
                    } else {
                        tbody.append('<tr><td colspan="5" class="text-center">파일 목록이 없습니다.</td></tr>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('파일 목록을 가져오는 중 오류 발생:', error);
                    $('#fileTableBody').html('<tr><td colspan="5" class="text-center">파일 목록을 로드하는 데 실패했습니다.</td></tr>');
                }
            });
        }

        $('#fileTableBody').on('click', '.delete-file', function (e) {
            e.preventDefault();
            const safeFilename = $(this).data('safe-filename'); // 파일의 안전한 경로
    
            if (confirm('정말로 이 파일을 삭제하시겠습니까?')) {
                $.ajax({
                    url: `/file/${safe_filename}`, // DELETE 요청을 보낼 엔드포인트
                    type: 'DELETE',
                    success: function () {
                        alert('파일이 성공적으로 삭제되었습니다.');
                        fetchAndRenderFiles(); // 파일 목록 갱신
                    },
                    error: function (xhr, status, error) {
                        console.error('파일 삭제 중 오류 발생:', error);
                        alert('파일 삭제에 실패했습니다.');
                    }
                });
            }
        });
    
        // 파일 다운로드 기능
        $('#fileTableBody').on('click', '.download-file', function (e) {
            e.preventDefault();
            const safeFilename = $(this).data('safe-filename'); // 파일의 안전한 경로
    
            // GET 요청으로 파일 다운로드
            const downloadUrl = `/file/${safe_filename}`;
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = safeFilename; // 다운로드될 파일 이름
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
        

        function fetchAndRenderFiles3() {
            $.ajax({
                url: '/api/files', // 파일 목록을 가져오는 백엔드 API
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    const tbody = $('#smallTable'); // ID가 smallTable인 <tbody> 선택
                    tbody.empty(); // 기존 내용 초기화
                    
                    if (response.files && response.files.length > 0) {
                        // 파일 목록에서 상위 6개만 가져오기
                        const limitedFiles = response.files.slice(0, 6);
        
                        limitedFiles.forEach(file => {
                            const fileNameParts = file.name.split('.');
                            const fileName = fileNameParts.slice(0, -1).join('.');
                            const fileExtension = fileNameParts.pop().toLowerCase();
        
                            const iconClasses = {
                                pdf: 'ri-file-pdf-line bg-danger',
                                docx: 'ri-file-word-line bg-primary',
                                xlsx: 'ri-file-excel-line bg-info',
                                pptx: 'ri-file-ppt-line bg-success',
                                default: 'ri-file-line bg-secondary'
                            };
                            const iconClass = iconClasses[fileExtension] || iconClasses.default;
        
                            const formattedSize = formatFileSize(file.size);
                            const formattedDate = new Date(file.created_at).toLocaleDateString();
        
                            const fileRow = `
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="icon-small ${iconClass.split(' ')[1]} rounded mr-3">
                                                <i class="${iconClass.split(' ')[0]}"></i>
                                            </div>
                                            <div 
                                                data-load-file="file" 
                                                data-load-target="#resolte-contaniner" 
                                                data-url="${file.path}" 
                                                data-toggle="modal" 
                                                data-target="#exampleModal" 
                                                data-title="${file.name}" 
                                                style="cursor: pointer;">
                                                ${file.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>Me</td>
                                    <td>${formattedDate}</td>
                                    <td>${formattedSize}</td>
                                    <td>
                                        <div class="dropdown">
                                            <span class="dropdown-toggle" id="dropdownMenuButton-${file.id}" data-toggle="dropdown">
                                                <i class="ri-more-fill"></i>
                                            </span>
                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton-${file.id}">
                                                <a class="dropdown-item delete-file" href="#" data-safe-filename="${file.path}">
                                                    <i class="ri-delete-bin-6-fill mr-2"></i>Delete
                                                </a>
                                                <a class="dropdown-item download-file" href="#" data-safe-filename="${file.path}">
                                                    <i class="ri-file-download-fill mr-2"></i>Download
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            `;
                            tbody.append(fileRow);
                        });
                    } else {
                        tbody.append('<tr><td colspan="5" class="text-center">파일 목록이 없습니다.</td></tr>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('파일 목록을 가져오는 중 오류 발생:', error);
                    $('#fileTableBody').html('<tr><td colspan="5" class="text-center">파일 목록을 로드하는 데 실패했습니다.</td></tr>');
                }
            });
        }
        
        /*--------------------------------------------------------
        회원가입
        ----------------------------------------------------*/
        $('#signUpForm').on('submit', function (e) {
            e.preventDefault(); // 기본 폼 제출 동작 방지
    
            // 입력값 가져오기
            const firstName = $('#firstName').val().trim();
            const lastName = $('#lastName').val().trim();
            const email = $('#email').val().trim();
            const password = $('#password').val().trim();
            const confirmPassword = $('#confirmpassword').val().trim();
            const termsAccepted = $('#customCheck1').is(':checked');
    
            // 유효성 검사
            if (!firstName || !lastName) {
                alert('이름과 성을 입력해주세요.');
                return;
            }
            if (!email) {
                alert('이메일을 입력해주세요.');
                return;
            }
            if (!password) {
                alert('비밀번호를 입력해주세요.');
                return;
            }
            if (password !== confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            if (!termsAccepted) {
                alert('약관에 동의해주세요.');
                return;
            }
    
            // AJAX 요청으로 회원가입 데이터 전송
            $.ajax({
                url: '/api/auth/signup', // 서버의 회원가입 API 엔드포인트
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }),
                success: function (response) {
                    // 회원가입 성공 처리
                    alert('회원가입이 성공적으로 완료되었습니다!');
                    console.log('응답 데이터:', response);
    
                    // 성공 시 로그인 페이지로 리디렉션
                    window.location.href = 'auth-sign-in.html';
                },
                error: function (xhr, status, error) {
                    // 회원가입 실패 처리
                    const errorMessage = xhr.responseJSON?.message || '회원가입에 실패했습니다.';
                    alert(errorMessage);
                    console.error('에러:', error);
                }
            });
        });
        /*--------------------------------------------------------
        로그인
        -------------------------------------------------------*/
        $('#signInForm').on('submit', function (e) {
            e.preventDefault(); // 기본 폼 제출 동작 방지
    
            // 입력값 가져오기
            const email = $('input[type="email"]').val().trim();
            const password = $('input[type="password"]').val().trim();
    
            // 입력값 유효성 검사
            if (!email) {
                alert('이메일을 입력해주세요.');
                return;
            }
            if (!password) {
                alert('비밀번호를 입력해주세요.');
                return;
            }
    
            // AJAX 요청으로 로그인 수행
            $.ajax({
                url: '/api/auth/login', // 서버의 로그인 API 엔드포인트
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: email,
                    password: password
                }),
                success: function (response) {
                    if(response.token){
                        // 로그인 성공 처리
                        setCookie('accessToken',response.token, 7);
                        alert('로그인 성공!');
                        console.log('응답 데이터:', response);

                        // 성공 시 대시보드로 리디렉션
                        window.location.href = '/dashboard';
                    }
                },
                error: function (xhr, status, error) {
                    // 로그인 실패 처리
                    const errorMessage = xhr.responseJSON?.message || '로그인에 실패했습니다.';
                    alert(errorMessage);
                    console.error('에러:', error);
                }
            });
        });

        function setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + days*24*60*1000);
            document.cooke = `${name}=${value}; expires=${date.toUTCString()}; path=/; Secure; HttpOnly`;
        }
        
        /*--------------------------------------------------------------------
        클라이언트 파일 업로드 실행 
        ----------------------------------------------------------------------*/
        $('#uploadFiles').on('click', function () {
            $('#fileInput').click();
        });
        $('#uploadFiles2').on('click', function () {
            $('#fileInput').click();
        });
    
        /*----------------------------------------------------------------------
        파일 웹서버 전송
        -----------------------------------------------------------------------*/
        $('#fileInput').on('change', function () {
            const files = this.files;
            if (files.length > 0) {
                const formData = new FormData();
    
                // 선택된 파일 추가
                for (let i = 0; i < files.length; i++) {
                    formData.append('files[]', files[i]);
                }
    
                // AJAX 요청으로 파일 전송
                $.ajax({
                    url: '/api/files/upload', // 서버의 파일 업로드 처리 URL
                    type: 'POST',
                    data: formData,
                    processData: false, // FormData 객체를 문자열로 변환하지 않음
                    contentType: false, // 기본 Content-Type 설정을 사용하지 않음
                    success: function (response) {
                        alert('파일 업로드 성공!');
                        console.log('서버 응답:', response);
                    },
                    error: function (xhr, status, error) {
                        alert('파일 업로드 실패.');
                        console.error('에러:', error);
                    },
                });
            }
        });
        /*---------------------------------------------------------------------
        Tooltip
        -----------------------------------------------------------------------*/
        jQuery('[data-toggle="popover"]').popover();
        jQuery('[data-toggle="tooltip"]').tooltip();

        /*---------------------------------------------------------------------
        Fixed Nav
        -----------------------------------------------------------------------*/

        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 0) {
                $('.iq-top-navbar').addClass('fixed');
            } else {
                $('.iq-top-navbar').removeClass('fixed');
            }
        });

        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 0) {
                $('.white-bg-menu').addClass('sticky-menu');
            } else {
                $('.white-bg-menu').removeClass('sticky-menu');
            }
        });

        /*---------------------------------------------------------------------
           Scroll up menu
        -----------------------------------------------------------------------*/
        var position = $(window).scrollTop();
        $(window).on('scroll', function () {
            var scroll = $(window).scrollTop();
            //  console.log(scroll);

            if (scroll < position) {
                $('.tab-menu-horizontal').addClass('menu-up');
                $('.tab-menu-horizontal').removeClass('menu-down');
            }
            else {
                $('.tab-menu-horizontal').addClass('menu-down');
                $('.tab-menu-horizontal').removeClass('menu-up');
            }
            if (scroll == 0) {
                $('.tab-menu-horizontal').removeClass('menu-up');
                $('.tab-menu-horizontal').removeClass('menu-down');
            }
            position = scroll;
        });


        /*---------------------------------------------------------------------
        Magnific Popup
        -----------------------------------------------------------------------*/
        if(typeof $.fn.magnificPopup !== typeof undefined){
            jQuery('.popup-gallery, .icon-grid').magnificPopup({
                delegate: 'a.image-popup-vertical-fit',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function(item) {
                        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                    }
                }
            });
            jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }


        /*---------------------------------------------------------------------
        Ripple Effect
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', ".iq-waves-effect", function(e) {
            // Remove any old one
            jQuery('.ripple').remove();
            // Setup
            let posX = jQuery(this).offset().left,
                posY = jQuery(this).offset().top,
                buttonWidth = jQuery(this).width(),
                buttonHeight = jQuery(this).height();

            // Add the element
            jQuery(this).prepend("<span class='ripple'></span>");


            // Make it round!
            if (buttonWidth >= buttonHeight) {
                buttonHeight = buttonWidth;
            } else {
                buttonWidth = buttonHeight;
            }

            // Get the center of the element
            let x = e.pageX - posX - buttonWidth / 2;
            let y = e.pageY - posY - buttonHeight / 2;


            // Add the ripples CSS and start the animation
            jQuery(".ripple").css({
                width: buttonWidth,
                height: buttonHeight,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
        });

       /*---------------------------------------------------------------------
        Sidebar Widget
        -----------------------------------------------------------------------*/

        jQuery(document).on("click", '.iq-menu > li > a', function() {
            jQuery('.iq-menu > li > a').parent().removeClass('active');
            jQuery(this).parent().addClass('active');
        });

        // Active menu
        var parents = jQuery('li.active').parents('.iq-submenu.collapse');

        parents.addClass('show');


        parents.parents('li').addClass('active');
        jQuery('li.active > a[aria-expanded="false"]').attr('aria-expanded', 'true');

        /*---------------------------------------------------------------------
        FullScreen
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', '.iq-full-screen', function() {
            let elem = jQuery(this);
            if (!document.fullscreenElement &&
                !document.mozFullScreenElement && // Mozilla
                !document.webkitFullscreenElement && // Webkit-Browser
                !document.msFullscreenElement) { // MS IE ab version 11

                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
            elem.find('i').toggleClass('ri-fullscreen-line').toggleClass('ri-fullscreen-exit-line');
        });


        /*---------------------------------------------------------------------
       Page Loader
       -----------------------------------------------------------------------*/
        jQuery("#load").fadeOut();
        jQuery("#loading").delay().fadeOut("");



       /*---------------------------------------------------------------------
       Owl Carousel
       -----------------------------------------------------------------------*/
        jQuery('.owl-carousel').each(function() {
            let jQuerycarousel = jQuery(this);
            jQuerycarousel.owlCarousel({
                items: jQuerycarousel.data("items"),
                loop: jQuerycarousel.data("loop"),
                margin: jQuerycarousel.data("margin"),
                nav: jQuerycarousel.data("nav"),
                dots: jQuerycarousel.data("dots"),
                autoplay: jQuerycarousel.data("autoplay"),
                autoplayTimeout: jQuerycarousel.data("autoplay-timeout"),
                navText: ["<i class='fa fa-angle-left fa-2x'></i>", "<i class='fa fa-angle-right fa-2x'></i>"],
                responsiveClass: true,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: jQuerycarousel.data("items-mobile-sm"),
                        nav: false,
                        dots: true
                    },
                    // breakpoint from 480 up
                    480: {
                        items: jQuerycarousel.data("items-mobile"),
                        nav: false,
                        dots: true
                    },
                    // breakpoint from 786 up
                    786: {
                        items: jQuerycarousel.data("items-tab")
                    },
                    // breakpoint from 1023 up
                    1023: {
                        items: jQuerycarousel.data("items-laptop")
                    },
                    1199: {
                        items: jQuerycarousel.data("items")
                    }
                }
            });
        });


        /*---------------------------------------------------------------------
        Counter
        -----------------------------------------------------------------------*/
        if (window.counterUp !== undefined) {
            const counterUp = window.counterUp["default"]
            const $counters = $(".counter");
            $counters.each(function (ignore, counter) {
                var waypoint = new Waypoint( {
                    element: $(this),
                    handler: function() {
                        counterUp(counter, {
                            duration: 1000,
                            delay: 10
                        });
                        this.destroy();
                    },
                    offset: 'bottom-in-view',
                } );
            });
        }


        /*---------------------------------------------------------------------
        Progress Bar
        -----------------------------------------------------------------------*/
        jQuery('.iq-progress-bar > span').each(function() {
            let progressBar = jQuery(this);
            let width = jQuery(this).data('percent');
            progressBar.css({
                'transition': 'width 2s'
            });

            setTimeout(function() {
                progressBar.appear(function() {
                    progressBar.css('width', width + '%');
                });
            }, 100);
        });

        jQuery('.progress-bar-vertical > span').each(function () {
            let progressBar = jQuery(this);
            let height = jQuery(this).data('percent');
            progressBar.css({
                'transition': 'height 2s'
            });
            setTimeout(function () {
                progressBar.appear(function () {
                    progressBar.css('height', height + '%');
                });
            }, 100);
        });



        /*---------------------------------------------------------------------
        Page Menu
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', '.wrapper-menu', function() {
            jQuery(this).toggleClass('open');
        });

        jQuery(document).on('click', ".wrapper-menu", function() {
            jQuery("body").toggleClass("sidebar-main");
        });


      /*---------------------------------------------------------------------
       Close  navbar Toggle
       -----------------------------------------------------------------------*/

        jQuery('.close-toggle').on('click', function () {
            jQuery('.h-collapse.navbar-collapse').collapse('hide');
        });


        /*---------------------------------------------------------------------
        Mailbox
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', 'ul.iq-email-sender-list li', function () {
            jQuery(this).next().addClass('show');
            // jQuery('.mail-box-detail').css('filter','blur(4px)');
        });

        jQuery(document).on('click', '.email-app-details li h4', function () {
            jQuery('.email-app-details').removeClass('show');
        });

        /*---------------------------------------------------------------------
        chatuser
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', '.chat-head .chat-user-profile', function () {
            jQuery(this).parent().next().toggleClass('show');
        });
        jQuery(document).on('click', '.user-profile .close-popup', function () {
            jQuery(this).parent().parent().removeClass('show');
        });

        /*---------------------------------------------------------------------
        chatuser main
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', '.chat-search .chat-profile', function () {
            jQuery(this).parent().next().toggleClass('show');
        });
        jQuery(document).on('click', '.user-profile .close-popup', function () {
            jQuery(this).parent().parent().removeClass('show');
        });

        /*---------------------------------------------------------------------
        Chat start
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', '#chat-start', function () {
            jQuery('.chat-data-left').toggleClass('show');
        });
        jQuery(document).on('click', '.close-btn-res', function () {
            jQuery('.chat-data-left').removeClass('show');
        });
        jQuery(document).on('click', '.iq-chat-ui li', function () {
            jQuery('.chat-data-left').removeClass('show');
        });
        jQuery(document).on('click', '.sidebar-toggle', function () {
            jQuery('.chat-data-left').addClass('show');
        });

        /*---------------------------------------------------------------------
        todo Page
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', '.todo-task-list > li > a', function () {
            jQuery('.todo-task-list li').removeClass('active');
            jQuery('.todo-task-list .sub-task').removeClass('show');
            jQuery(this).parent().toggleClass('active');
            jQuery(this).next().toggleClass('show');
        });
        jQuery(document).on('click', '.todo-task-list > li li > a', function () {
            jQuery('.todo-task-list li li').removeClass('active');
            jQuery(this).parent().toggleClass('active');
        });

        /*---------------------------------------------------------------------
        user toggle
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', '.iq-user-toggle', function() {
            jQuery(this).parent().addClass('show-data');
        });

        jQuery(document).on('click', ".close-data", function() {
            jQuery('.iq-user-toggle').parent().removeClass('show-data');
        });
        jQuery(document).on("click", function(event){
        var $trigger = jQuery(".iq-user-toggle");
        if($trigger !== event.target && !$trigger.has(event.target).length){
            jQuery(".iq-user-toggle").parent().removeClass('show-data');
        }
        });
        /*-------hide profile when scrolling--------*/
        jQuery(window).scroll(function () {
            let scroll = jQuery(window).scrollTop();
            if (scroll >= 10 && jQuery(".iq-user-toggle").parent().hasClass("show-data")) {
                jQuery(".iq-user-toggle").parent().removeClass("show-data");
            }
        });
        let Scrollbar = window.Scrollbar;
        if (jQuery('.data-scrollbar').length) {

            Scrollbar.init(document.querySelector('.data-scrollbar'), { continuousScrolling: false });
        }

        /*---------------------------------------------------------------------
           Scroll up horizontal menu
        -----------------------------------------------------------------------*/
        var position = $(window).scrollTop();
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll < position) {
                $('.bg-nav-horizontal').addClass('menu-up');
                $('.bg-nav-horizontal').removeClass('menu-down');
            }
            else {
                $('.bg-nav-horizontal').addClass('menu-down');
                $('.bg-nav-horizontal').removeClass('menu-up');
            }
            if (scroll == 0) {
                $('.bg-nav-horizontal').removeClass('menu-up');
                $('.bg-nav-horizontal').removeClass('menu-down');
            }
            position = scroll;
        });

        /*---------------------------------------------------------------------
        Data tables
        -----------------------------------------------------------------------*/
        if($.fn.DataTable){
            $('.data-table').DataTable();
        }




        /*---------------------------------------------------------------------
        Form Validation
        -----------------------------------------------------------------------*/

        // Example starter JavaScript for disabling form submissions if there are invalid fields
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);

      /*---------------------------------------------------------------------
       Active Class for Pricing Table
       -----------------------------------------------------------------------*/
      jQuery("#my-table tr th").click(function () {
        jQuery('#my-table tr th').children().removeClass('active');
        jQuery(this).children().addClass('active');
        jQuery("#my-table td").each(function () {
          if (jQuery(this).hasClass('active')) {
            jQuery(this).removeClass('active')
          }
        });
        var col = jQuery(this).index();
        jQuery("#my-table tr td:nth-child(" + parseInt(col + 1) + ")").addClass('active');
      });

        /*------------------------------------------------------------------
        Flatpicker
        * -----------------------------------------------------------------*/
      if (jQuery('.date-input').hasClass('basicFlatpickr')) {
          jQuery('.basicFlatpickr').flatpickr();
          jQuery('#inputTime').flatpickr({
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
          });
          jQuery('#inputDatetime').flatpickr({
            enableTime: true
          });
          jQuery('#inputWeek').flatpickr({
            weekNumbers: true
          });
          jQuery("#inline-date").flatpickr({
              inline: true
          });
          jQuery("#inline-date1").flatpickr({
              inline: true
          });
      }

        /*---------------------------------------------------------------------
        Scrollbar
        -----------------------------------------------------------------------*/

        jQuery(window).on("resize", function () {
            if (jQuery(this).width() <= 1299) {
                jQuery('#salon-scrollbar').addClass('data-scrollbar');
            } else {
                jQuery('#salon-scrollbar').removeClass('data-scrollbar');
            }
        }).trigger('resize');

        jQuery('.data-scrollbar').each(function () {
            var attr = $(this).attr('data-scroll');
            if (typeof attr !== typeof undefined && attr !== false){
            let Scrollbar = window.Scrollbar;
            var a = jQuery(this).data('scroll');
            Scrollbar.init(document.querySelector('div[data-scroll= "' + a + '"]'));
            }
        });



        /*---------------------------------------------------------------------
           checkout
        -----------------------------------------------------------------------*/

        jQuery(document).ready(function(){
            jQuery('#place-order').click(function(){
                jQuery('#cart').removeClass('show');
                jQuery('#address').addClass('show');
            });
            jQuery('#deliver-address').click(function(){
                jQuery('#address').removeClass('show');
                jQuery('#payment').addClass('show');
            });
        });

         /*---------------------------------------------------------------------
           Datatables
        -----------------------------------------------------------------------*/
        if(jQuery('.data-tables').length)
        {
          $('.data-tables').DataTable();
        }


      /*---------------------------------------------------------------------
      image-upload
      -----------------------------------------------------------------------*/

      $('.form_gallery-upload').on('change', function() {
          var length = $(this).get(0).files.length;
          var galleryLabel  = $(this).attr('data-name');

          if( length > 1 ){
            $(galleryLabel).text(length + " files selected");
          } else {
            $(galleryLabel).text($(this)[0].files[0].name);
          }
        });

    /*---------------------------------------------------------------------
        video
      -----------------------------------------------------------------------*/
      $(document).ready(function(){
      $('.form_video-upload input').change(function () {
        $('.form_video-upload p').text(this.files.length + " file(s) selected");
      });
    });


        /*---------------------------------------------------------------------
        Button
        -----------------------------------------------------------------------*/

        jQuery('.qty-btn').on('click',function(){
          var id = jQuery(this).attr('id');

          var val = parseInt(jQuery('#quantity').val());

          if(id == 'btn-minus')
          {
            if(val != 0)
            {
              jQuery('#quantity').val(val-1);
            }
            else
            {
              jQuery('#quantity').val(0);
            }

          }
          else
          {
            jQuery('#quantity').val(val+1);
          }
        });
        if ($.fn.select2 !== undefined) {
            $("#single").select2({
                placeholder: "Select a Option",
                allowClear: true
            });
            $("#multiple").select2({
                placeholder: "Select a Multiple Option",
                allowClear: true
            });
            $("#multiple2").select2({
                placeholder: "Select a Multiple Option",
                allowClear: true
            });
        }

        /*---------------------------------------------------------------------
        Pricing tab
        -----------------------------------------------------------------------*/
        jQuery(window).on('scroll', function (e) {

            // Pricing Pill Tab
            var nav = jQuery('#pricing-pills-tab');
            if (nav.length) {
                var contentNav = nav.offset().top - window.outerHeight;
                if (jQuery(window).scrollTop() >= (contentNav)) {
                    e.preventDefault();
                    jQuery('#pricing-pills-tab li a').removeClass('active');
                    jQuery('#pricing-pills-tab li a[aria-selected=true]').addClass('active');
                }
            }
        });

        /*---------------------------------------------------------------------
       menu click li
       -----------------------------------------------------------------------*/

        jQuery('.two-sidebar .iq-sidebar-small').on('mouseover' , function(){
            jQuery('.two-sidebar .iq-sidebar').addClass('iq-sidebar-hover');
       });

        jQuery('.two-sidebar .iq-sidebar-small').on('mouseleave', function () {
            jQuery('.two-sidebar .iq-sidebar').removeClass('iq-sidebar-hover');
        });

        if (jQuery('.two-sidebar').find('li.active').length > 0) {
            const active = jQuery('.two-sidebar').find('li.active').closest('.tab-pane')
            jQuery('.nav-pills a[href="#'+active.attr('id')+'"]').tab('show');
        }


        /*---------------------------------------------------------------------
        tab sidebar back close
        -----------------------------------------------------------------------*/

        jQuery('.iq-tab-toggle').on('click', function () {
            jQuery(this).fadeOut().prev('.tab-scrollbar-data').addClass('tab-sidebar-close')
            jQuery('.close-setting-sidebar').removeClass('active')
            jQuery('body').removeClass('setting-sidebar-open');
        });
        jQuery('.iq-tab-toggle').on('click', function () {
            if (jQuery(this).hasClass('active') === true) {
                jQuery('.tab-scrollbar-data').addClass('tab-sidebar-close')
                jQuery(this).removeClass('active');
                jQuery('body').removeClass('tab-sidebar-data-open');
                jQuery('.iq-tab-toggle').fadeOut();
            } else {
                jQuery('.tab-scrollbar-data').removeClass('tab-sidebar-close')
                jQuery(this).addClass('active');
                jQuery('body').addClass('tab-sidebar-data-open');
                if (jQuery('#hidebackdrop').is(':checked') != true) {
                    jQuery('.iq-tab-toggle').fadeIn()
                }
            }
        });


        /*---------------------------------------------------------------------
        Remove collapse panel
        -----------------------------------------------------------------------*/

        jQuery(window).bind("resize", function () {
            if (jQuery(this).width() <= 1199) {
                jQuery('.iq-navbar-callapse-menu .collapse').removeClass('show');
            } else{
                jQuery('.iq-navbar-callapse-menu .collapse').addClass('show');
            }
        }).trigger('resize');

        /*---------------------------------------------------------------------
        Current Time
        -----------------------------------------------------------------------*/
        setInterval(function () {
            var now = new Date(Date.now());
            var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            jQuery('.current-time').html(formatted);
        },1000);

        /*---------------------------------------------------------------------
        List and Grid
        -----------------------------------------------------------------------*/
        $('.list-grid-toggle').click(function() {
            var txt = $(".icon").hasClass('icon-grid') ? 'List' : 'Grid';
            $('.icon').toggleClass('icon-grid');
            $(".label").text(txt);
          })

          /*---------- */
          $(".dropdown-menu li a").click(function(){
            var selHtml = $(this).html();
            var selName = $.trim($(this).text())
            $(this).parents('.btn-group').find('.search-replace').html(selHtml);
            $(this).parents('.btn-group').find('.search-query').val(selName);
          });
    });

})(jQuery);
