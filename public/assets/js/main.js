$(function () {
    // Helper function for consistent pagination
    function getPaginationPages(currentPage, totalPages, isMobile) {
        const pages = [];
        pages.push({ type: 'page', value: currentPage });

        if (isMobile) {
            if (currentPage < totalPages) {
                pages.push({ type: 'page', value: currentPage + 1 });
            }
        } else {
            if (currentPage < totalPages) {
                const nextP = currentPage + 1;
                pages.push({ type: 'page', value: nextP });

                if (nextP < totalPages - 1) {
                    pages.push({ type: 'dots' });
                }

                if (nextP < totalPages) {
                    pages.push({ type: 'page', value: totalPages });
                }
            }
        }
        return pages;
    }

    // Unified jQuery Pagination Plugin
    $.fn.setupPagination = function (options) {
        const settings = $.extend({
            totalItems: 0,
            itemsPerPage: 10,
            currentPage: 1,
            infoSelector: null,
            onPageChange: null,
            isMobile: false
        }, options);

        return this.each(function () {
            const $container = $(this);
            if (!$container.length) return;

            $container.empty();

            const totalPages = Math.ceil(settings.totalItems / settings.itemsPerPage);
            if (totalPages <= 1) {
                // Update Info even if totalPages is 0 or 1
                if (settings.infoSelector) {
                    const $info = $(settings.infoSelector);
                    if ($info.length) {
                        if (settings.totalItems === 0) {
                            $info.html('No entries found');
                        } else {
                            $info.html(`Showing <span class="font-medium">1</span> to <span class="font-medium">${settings.totalItems}</span> of <span class="font-medium">${settings.totalItems}</span> entries`);
                        }
                    }
                }
                return;
            }

            // Update Info
            if (settings.infoSelector) {
                const $info = $(settings.infoSelector);
                if ($info.length) {
                    const start = (settings.currentPage - 1) * settings.itemsPerPage + 1;
                    const end = Math.min(settings.currentPage * settings.itemsPerPage, settings.totalItems);
                    $info.html(`Showing <span class="font-medium">${start}</span> to <span class="font-medium">${end}</span> of <span class="font-medium">${settings.totalItems}</span> entries`);
                }
            }

            // Previous Button
            const $prevBtn = $('<button></button>')
                .addClass(`pagination-btn ${settings.currentPage === 1 ? 'disabled' : ''}`)
                .html('<i class="fas fa-chevron-left"></i>');

            if (settings.currentPage > 1) {
                $prevBtn.on('click', () => settings.onPageChange(settings.currentPage - 1));
            }
            $container.append($prevBtn);

            const pages = getPaginationPages(settings.currentPage, totalPages, settings.isMobile);

            pages.forEach(p => {
                if (p.type === 'page') {
                    const $btn = $('<button></button>')
                        .addClass(`pagination-btn ${settings.currentPage === p.value ? 'active' : ''}`)
                        .text(p.value);

                    $btn.on('click', () => settings.onPageChange(p.value));
                    $container.append($btn);
                } else if (p.type === 'dots') {
                    const $dots = $('<span></span>')
                        .addClass('px-2 self-center text-gray-400')
                        .text('...');
                    $container.append($dots);
                }
            });

            // Next Button
            const $nextBtn = $('<button></button>')
                .addClass(`pagination-btn ${settings.currentPage === totalPages ? 'disabled' : ''}`)
                .html('<i class="fas fa-chevron-right"></i>');

            if (settings.currentPage < totalPages) {
                $nextBtn.on('click', () => settings.onPageChange(settings.currentPage + 1));
            }
            $container.append($nextBtn);
        });
    };

    // Clone header items into sidebar for mobile menu if not already cloned
    const $sidebarMenu = $('.sidebar .nav-menu');
    if ($sidebarMenu.length && !$('.sidebar-mobile-utilities').length) {
        // Create mobile utilities section
        const $mobileUtils = $('<div class="sidebar-mobile-utilities"></div>');

        // Clone Search Box
        const $searchBox = $('.top-bar .search-box').clone(true);
        if ($searchBox.length) {
            $mobileUtils.append($searchBox);
        }

        // Clone Balance Widget
        const $balanceWidget = $('.top-bar .balance-widget').clone(true);
        if ($balanceWidget.length) {
            $mobileUtils.append($balanceWidget);
        }

        // Clone Language Switcher
        const $langSwitcher = $('.top-bar .header-icon:not(.notification-bell)').first().clone(true);
        if ($langSwitcher.length) {
            $langSwitcher.html('<i class="fas fa-globe mr-2"></i> Language: English (EN)');
            $mobileUtils.append($langSwitcher);
        }

        // Prepend to nav-menu inside sidebar
        $sidebarMenu.prepend($mobileUtils);
    }

    // Chart Toggle Logic
    const $toggleBtns = $('.toggle-btn');
    $toggleBtns.on('click', function () {
        $toggleBtns.removeClass('active');
        $(this).addClass('active');

        // In a real app, you would update the chart data here
        console.log(`Switched to ${$(this).text()}`);
    });

    // Sidebar Mobile Toggle (if needed)
    const $sidebar = $('.sidebar');

    // Smooth transitions for chart bars on load
    const $bars = $('.chart-bar');
    $bars.each(function (index) {
        const $bar = $(this);
        const targetHeight = $bar.css('height');
        $bar.css({
            'height': '0',
            'transition': `height 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + (index * 0.1)}s`
        });

        setTimeout(() => {
            $bar.css('height', targetHeight);
        }, 100);
    });

    // Count Up Animation for Stats
    $('.stat-value').each(function () {
        const $this = $(this);
        const text = $this.text();
        const target = parseInt(text.replace(/[^0-9]/g, ''));
        const prefix = text.includes('$') ? '$' : '';
        const suffix = text.includes('%') ? '%' : '';

        $({ countNum: 0 }).animate({ countNum: target }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.text(prefix + Math.floor(this.countNum).toLocaleString() + suffix);
            },
            complete: function () {
                $this.text(prefix + target.toLocaleString() + suffix);
            }
        });
    });

    // Sidebar Scrollbar Enhancement
    const $navMenu = $('.nav-menu');
    let scrollTimeout;

    if ($navMenu.length) {
        $navMenu.on('scroll', () => {
            $navMenu.addClass('is-scrolling');

            // Clear the timeout if it exists
            clearTimeout(scrollTimeout);

            // Remove the class after a short delay of no scrolling
            scrollTimeout = setTimeout(() => {
                $navMenu.removeClass('is-scrolling');
            }, 1000);
        });
    }

    // Sidebar Toggle Logic
    const $sidebarToggle = $('#sidebar-toggle');
    const $mainContent = $('.main-content');

    if ($sidebarToggle.length && $sidebar.length && $mainContent.length) {
        $sidebarToggle.on('click', () => {
            $sidebar.toggleClass('collapsed');
            $mainContent.toggleClass('sidebar-collapsed');

            // Update toggle icon
            const $icon = $sidebarToggle.find('i');
            if ($sidebar.hasClass('collapsed')) {
                $icon.removeClass('fa-chevron-left').addClass('fa-chevron-right');
            } else {
                $icon.removeClass('fa-chevron-right').addClass('fa-chevron-left');
            }
        });
    }

    // Mobile Sidebar Toggle
    const $mobileSidebarToggle = $('#mobile-sidebar-toggle');
    const $sidebarClose = $('#sidebar-close');
    const $body = $('body');

    // Create overlay if it doesn't exist
    let $overlay = $('.sidebar-overlay');
    if (!$overlay.length) {
        $overlay = $('<div class="sidebar-overlay"></div>');
        $('body').append($overlay);
    }

    if ($mobileSidebarToggle.length && $sidebar.length) {
        $mobileSidebarToggle.on('click', () => {
            $sidebar.toggleClass('open');
            $overlay.toggleClass('active');
            $('html, body').toggleClass('no-scroll', $sidebar.hasClass('open'));
        });

        const closeSidebar = () => {
            $sidebar.removeClass('open');
            $overlay.removeClass('active');
            $('html, body').removeClass('no-scroll');
        };

        $overlay.on('click', closeSidebar);
        if ($sidebarClose.length) {
            $sidebarClose.on('click', closeSidebar);
        }
    }

    // Header Sticky Enhancement
    const $topBar = $('.top-bar');
    if ($topBar.length) {
        $(window).on('scroll', () => {
            if ($(window).scrollTop() > 24) {
                $topBar.addClass('is-stuck');
            } else {
                $topBar.removeClass('is-stuck');
            }
        });
    }

    // jQuery for Parcels Page
    if ($('.parcels-details-wrap').length) {
        const totalPages = 10;
        let currentPage = 1;

        const renderPagination = (activePage) => {
            const $container = $('.pagination-controls .flex.items-center.gap-2');
            $container.empty();
            const totalPages = 10;
            const isMobile = $(window).width() < 475;

            const pages = getPaginationPages(activePage, totalPages, isMobile);

            pages.forEach(p => {
                if (p.type === 'page') {
                    const activeClass = p.value === activePage ? 'active' : '';
                    $container.append(`<button class="pagination-circle-btn ${activeClass}">${p.value}</button>`);
                } else if (p.type === 'dots') {
                    $container.append('<span class="text-[#94A3B8] px-1">...</span>');
                }
            });

            // Update Prev/Next button states
            const $prevBtn = $('.pagination-circle-btn').first();
            const $nextBtn = $('.pagination-circle-btn.next');

            if (activePage === 1) {
                $prevBtn.removeClass('active').attr('disabled', true).css('opacity', '0.5');
            } else {
                $prevBtn.addClass('active').removeAttr('disabled').css('opacity', '1');
            }

            if (activePage === totalPages) {
                $nextBtn.removeClass('active').attr('disabled', true).css('opacity', '0.5');
            } else {
                $nextBtn.addClass('active').removeAttr('disabled').css('opacity', '1');
            }
        };

        // Dynamic Table Data Simulation
        const updateTableData = (page, filterStatus = 'All') => {
            currentPage = page;
            const $rows = $('.table-responsive tbody tr');
            const startResult = (page - 1) * 25 + 1;
            const endResult = Math.min(page * 25, 1248);

            // Update "Showing X-Y of Z" text
            $('.results-count').text(`Showing ${startResult}–${endResult} of 1,248 results`);

            renderPagination(page);

            // Simulate data change
            $rows.each(function (index) {
                const randomId = Math.floor(100000 + Math.random() * 900000);
                const merchants = ['TrendyBD', 'ShajGoj', 'Daraz', 'Aarong', 'Chaldal'];
                const randomMerchant = merchants[Math.floor(Math.random() * merchants.length)];

                $(this).find('td:nth-child(2) span:first-child').text(`SC-2026-${randomId.toString().substring(0, 3)}`);
                $(this).find('td:nth-child(2) span:last-child').text(randomId.toString().substring(3));
                $(this).find('td:nth-child(3)').text(randomMerchant);

                // Update Status Badge
                const $statusTd = $(this).find('td:nth-child(8)');
                const cleanStatus = filterStatus.split(' (')[0].trim();
                let statusText = '';
                let statusClass = '';

                const statusMap = {
                    'Pending': 'status-pending',
                    'In Transit': 'status-transit',
                    'Out for Delivery': 'status-out-delivery',
                    'Returned': 'status-returned',
                    'Delivered': 'status-delivered'
                };

                if (cleanStatus === 'All' || cleanStatus === '') {
                    const statuses = Object.keys(statusMap);
                    statusText = statuses[Math.floor(Math.random() * statuses.length)];
                    statusClass = statusMap[statusText];
                } else {
                    statusText = cleanStatus;
                    statusClass = statusMap[cleanStatus] || 'status-pending';
                }

                $statusTd.html(`<span class="badge-status ${statusClass}">${statusText}</span>`);

                // Animation
                $(this).css('opacity', '0');
                setTimeout(() => {
                    $(this).css({
                        'opacity': '1',
                        'transition': 'opacity 0.3s ease'
                    });
                }, index * 20);
            });
        };

        // Initialize
        updateTableData(1);

        // Tab switching
        $('.tab-pill').on('click', function () {
            $('.tab-pill').removeClass('active');
            $(this).addClass('active');

            const selectedStatus = $(this).find('button').text();
            updateTableData(1, selectedStatus);
        });

        // Page Numbers (delegated)
        $('.pagination-controls').on('click', '.pagination-circle-btn:not(.next)', function () {
            const pageNum = parseInt($(this).text());
            if (!isNaN(pageNum)) {
                const activeStatus = $('.tab-pill.active button').text();
                updateTableData(pageNum, activeStatus);
            }
        });

        // Prev Button
        $('.pagination-controls .pagination-circle-btn').first().on('click', function () {
            if (currentPage > 1) {
                const activeStatus = $('.tab-pill.active button').text();
                updateTableData(currentPage - 1, activeStatus);
            }
        });

        // Next Button
        $('.pagination-circle-btn.next').on('click', function () {
            if (currentPage < totalPages) {
                const activeStatus = $('.tab-pill.active button').text();
                updateTableData(currentPage + 1, activeStatus);
            }
        });

        // Select all checkboxes
        $('.table-responsive thead input[type="checkbox"]').on('change', function () {
            const isChecked = $(this).is(':checked');
            $('.table-responsive tbody input[type="checkbox"]').prop('checked', isChecked);
        });

        // Handle window resize for responsive pagination
        $(window).on('resize', function () {
            renderPagination(currentPage);
        });
    }

    // Shipment Page Interactions
    $('.btn-preview-label').on('click', function () {
        console.log('Previewing Label...');
    });

    $('.btn-create-shipment').on('click', function () {
        console.log('Creating Shipment...');
    });

    // Pickup Assignment Interactions
    $('.btn-assign').on('click', function () {
        const $aiCard = $('.ai-assignment-card');
        if ($aiCard.length) {
            // Scroll to AI Assignment section
            $('html, body').animate({
                scrollTop: $aiCard.offset().top - 120
            }, 500);

            // Add highlight effect
            $aiCard.css({
                'transition': 'all 0.5s',
                'box-shadow': '0 0 20px rgba(0, 62, 183, 0.2)',
                'border': '1px solid rgba(0, 62, 183, 0.3)'
            });

            setTimeout(() => {
                $aiCard.css({
                    'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.03)',
                    'border': 'none'
                });
            }, 2000);
        }
    });

    // ==========================================
    // All Parcel Page Logic
    // ==========================================
    if ($('.consignments-table').length) {
        // Large Sample Dataset (50 entries)
        const allParcels = [];
        const statuses = ['Pending', 'Delivered', 'Cancelled', 'Approval Pending', 'Partly Delivered', 'In Review', 'Exceptional'];
        const names = ['Imran Hossain', 'Karim Sheikh', 'Sadia Islam', 'A. Karim', 'Rahat Ali', 'Mousumi Akter', 'John Doe', 'Jane Smith', 'Rafiqul Islam', 'Nusrat Jahan'];

        for (let i = 1; i <= 50; i++) {
            allParcels.push({
                sl: i.toString().padStart(2, '0'),
                date: `${(Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0')}-0${Math.floor(Math.random() * 3) + 1}-2026`,
                id: `ID:${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                name: names[Math.floor(Math.random() * names.length)],
                payment: Math.random() > 0.5 ? 'COD' : 'Prepaid',
                charge: `${Math.floor(Math.random() * 150) + 50} $`,
                status: statuses[Math.floor(Math.random() * statuses.length)]
            });
        }

        let filteredParcels = [...allParcels];
        let currentPage = 1;
        const rowsPerPage = 15;
        let isDateSorted = false;

        const renderTable = () => {
            const $tbody = $('.consignments-table tbody');
            if (!$tbody.length) {
                console.error('Parcel table tbody not found');
                return;
            }

            const startIndex = (currentPage - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            const paginatedItems = filteredParcels.slice(startIndex, endIndex);

            $tbody.empty();

            $.each(paginatedItems, function (index, item) {
                const row = `
                        <tr>
                            <td>${item.sl}</td>
                            <td>${item.date}</td>
                            <td class="font-bold">${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.payment}</td>
                            <td>${item.charge}</td>
                            <td>
                                <span class="badge badge-${item.status.toLowerCase().replace(/ /g, '-')}">${item.status}</span>
                            </td>
                            <td>
                                <a href="#" class="view-link">View details</a>
                            </td>
                        </tr>
                    `;
                $tbody.append(row);
            });

            $('#pagination-container').setupPagination({
                totalItems: filteredParcels.length,
                itemsPerPage: rowsPerPage,
                currentPage: currentPage,
                infoSelector: '#pagination-info',
                isMobile: $(window).width() < 475,
                onPageChange: function (newPage) {
                    currentPage = newPage;
                    renderTable();
                }
            });
        };

        // Filter & Sort Events
        let summaryCurrentPage = 1;
        const summaryRowsPerPage = 10;

        const renderSummaryView = (page) => {
            if (page) summaryCurrentPage = page;

            const $dashboardBody = $('.dashboard-container');
            if (!$dashboardBody.length) return;

            // Store original content
            if (!window.originalDashboardContent) {
                window.originalDashboardContent = $dashboardBody.html();
            }

            // Group parcels by date dynamically from the table data
            const grouped = {};
            $.each(allParcels, function (index, p) {
                grouped[p.date] = (grouped[p.date] || 0) + 1;
            });

            // Sort dates descending
            const sortedDates = Object.keys(grouped).sort((a, b) => {
                const [d1, m1, y1] = a.split('-');
                const [d2, m2, y2] = b.split('-');
                return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
            });

            // Paginate
            const startIndex = (summaryCurrentPage - 1) * summaryRowsPerPage;
            const paginatedDates = sortedDates.slice(startIndex, startIndex + summaryRowsPerPage);

            let tableRows = '';
            $.each(paginatedDates, function (index, date) {
                tableRows += `
                        <tr>
                            <td class="text-gray-medium">${date}</td>
                            <td class="text-gray-medium">${grouped[date]}</td>
                            <td><a href="#" class="details-link" onclick="event.preventDefault(); window.restoreDashboard();">View</a></td>
                        </tr>
                    `;
            });

            $dashboardBody.html(`
                    <div class="dashboard-header mb-4">
                        <div class="header-left-content">
                            <h1 class="text-[28px] font-bold text-[#111827] tracking-tight">List By Date</h1>
                        </div>
                        <div class="header-actions">
                            <button class="bg-[#003EB7] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#002D87] transition-all shadow-sm cursor-pointer" onclick="window.restoreDashboard()">All Consignments</button>
                        </div>
                    </div>
                    <div class="summary-table-container">
                        <div class="summary-table-inner overflow-x-auto">
                            <table class="consignments-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div class="px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#F1F5F9] bg-white">
                            <div id="summary-pagination-info" class="text-sm text-[#64748B] text-center md:text-left">
                            </div>
                            <div id="summary-pagination-container" class="flex flex-wrap justify-center gap-2">
                            </div>
                        </div>
                    </div>
                `);

            // Setup pagination controls
            $('#summary-pagination-container').setupPagination({
                totalItems: sortedDates.length,
                itemsPerPage: summaryRowsPerPage,
                currentPage: summaryCurrentPage,
                infoSelector: '#summary-pagination-info',
                isMobile: $(window).width() < 475,
                onPageChange: function (newPage) {
                    summaryCurrentPage = newPage;
                    renderSummaryView();
                }
            });
        };

        window.restoreDashboard = () => {
            const $dashboardBody = $('.dashboard-container');
            if (window.originalDashboardContent) {
                $dashboardBody.html(window.originalDashboardContent);
                initParcelTable();
            }
        };

        const initParcelTable = () => {
            const $filterContainer = $('.filter-tabs');
            if ($filterContainer.length && !$filterContainer.data('listenerAdded')) {
                $filterContainer.on('click', '.filter-tab', function () {
                    const $tab = $(this);
                    const filter = $tab.text().trim();

                    if (filter === 'List by Date') {
                        renderSummaryView();
                        return;
                    }

                    // Update active state
                    $('.filter-tab').removeClass('active');
                    $tab.addClass('active');

                    // Filter data
                    if (filter === 'All') {
                        filteredParcels = [...allParcels];
                    } else {
                        filteredParcels = allParcels.filter(p => p.status === filter);
                    }

                    isDateSorted = false;
                    currentPage = 1;
                    renderTable();
                });
                $filterContainer.data('listenerAdded', 'true');
            }

            renderTable();
        };

        console.log('Initializing Parcel Table Render');
        initParcelTable();
    }

    // ==========================================
    // Clearable Consignments Pagination Logic
    // ==========================================
    const $clearableTable = $('#clearable-consignments-table');
    if ($clearableTable.length) {
        // Sample Data based on UI
        const clearableData = [];
        const statuses = [
            { text: 'Delivered', class: 'bg-[#D1FAE5] text-[#059669]' },
            { text: 'Pending', class: 'bg-[#FFEDD5] text-[#D97706]' },
            { text: 'Returned', class: 'bg-[#FEE2E2] text-[#DC2626]' }
        ];

        // Generating 45 dummy items to simulate pagination
        for (let i = 1; i <= 45; i++) {
            const statusObj = statuses[i % 3];
            const isDelivered = statusObj.text === 'Delivered';
            clearableData.push({
                date: `May ${(Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0')}, 2026`,
                id: `#${Math.floor(1000 + Math.random() * 9000)}`,
                invoice: `INV-${9000 + i}`,
                customer: i % 2 === 0 ? 'Ariful Islam' : 'Sadia Akter',
                amount: '$ 3,500',
                charge: '$ 60',
                lot: `L-${(80 + (i % 5)).toString().padStart(3, '0')}`,
                status: statusObj.text,
                statusClass: statusObj.class,
                notes: isDelivered ? 'No issues' : (statusObj.text === 'Pending' ? 'Call before d...' : 'Refused by c...')
            });
        }

        let clearableCurrentPage = 1;
        const clearableRowsPerPage = 15;

        const renderClearableTable = () => {
            const $tbody = $clearableTable.find('tbody');
            $tbody.empty();

            const startIndex = (clearableCurrentPage - 1) * clearableRowsPerPage;
            const endIndex = startIndex + clearableRowsPerPage;
            const paginatedItems = clearableData.slice(startIndex, endIndex);

            $.each(paginatedItems, function (index, item) {
                const row = `
                        <tr class="border-b border-[#F1F5F9] hover:bg-slate-50 transition-colors">
                            <td class="px-6 py-5 text-[14px] font-medium text-[#64748B] whitespace-nowrap">${item.date}</td>
                            <td class="px-6 py-5 text-[14px] font-medium text-[#64748B] whitespace-nowrap">${item.id}</td>
                            <td class="px-6 py-5 text-[14px] font-medium text-[#64748B] whitespace-nowrap">${item.invoice}</td>
                            <td class="px-6 py-5 text-[14px] font-medium text-[#64748B] whitespace-nowrap">${item.customer}</td>
                            <td class="px-6 py-5 text-[14px] font-medium text-[#64748B] whitespace-nowrap">${item.amount}</td>
                            <td class="px-6 py-5 text-[14px] font-medium text-[#64748B] whitespace-nowrap">${item.charge}</td>
                            <td class="px-6 py-5 text-[14px] font-medium text-[#64748B] whitespace-nowrap">${item.lot}</td>
                            <td class="px-6 py-5 whitespace-nowrap">
                                <span class="inline-flex items-center justify-center px-4 py-1.5 rounded-full ${item.statusClass} text-[13px] font-medium min-w-[86px]">${item.status}</span>
                            </td>
                            <td class="px-6 py-5 text-[14px] font-medium text-[#64748B] whitespace-nowrap">${item.notes}</td>
                        </tr>
                    `;
                $tbody.append(row);
            });

            // Update Info
            const $infoElement = $('#clearable-pagination-info');
            if ($infoElement.length) {
                $infoElement.html(`Showing <span class="font-medium">${startIndex + 1}</span> to <span class="font-medium">${Math.min(endIndex, clearableData.length)}</span> of <span class="font-medium">${clearableData.length}</span> entries`);
            }

            renderClearablePaginationButtons();
        };

        const renderClearablePaginationButtons = () => {
            const totalPages = Math.ceil(clearableData.length / clearableRowsPerPage);
            const $paginationContainer = $('#clearable-pagination-container');
            if (!$paginationContainer.length) return;

            $paginationContainer.empty();

            if (totalPages <= 1) return;

            // Previous Button
            const $prevBtn = $('<button></button>');
            $prevBtn.addClass(`pagination-btn ${clearableCurrentPage === 1 ? 'disabled' : ''}`);
            $prevBtn.html('<i class="fas fa-chevron-left"></i>');
            $prevBtn.on('click', () => { if (clearableCurrentPage > 1) { clearableCurrentPage--; renderClearableTable(); } });
            $paginationContainer.append($prevBtn);

            const isMobile = $(window).width() < 475;
            const pages = getPaginationPages(clearableCurrentPage, totalPages, isMobile);

            pages.forEach(p => {
                if (p.type === 'page') {
                    const $pageBtn = $('<button></button>');
                    $pageBtn.addClass(`pagination-btn ${clearableCurrentPage === p.value ? 'active' : ''}`);
                    $pageBtn.text(p.value);
                    $pageBtn.on('click', () => { clearableCurrentPage = p.value; renderClearableTable(); });
                    $paginationContainer.append($pageBtn);
                } else if (p.type === 'dots') {
                    const $dots = $('<span></span>');
                    $dots.addClass('px-2 self-center text-gray-400');
                    $dots.text('...');
                    $paginationContainer.append($dots);
                }
            });

            // Next Button
            const $nextBtn = $('<button></button>');
            $nextBtn.addClass(`pagination-btn ${clearableCurrentPage === totalPages ? 'disabled' : ''}`);
            $nextBtn.html('<i class="fas fa-chevron-right"></i>');
            $nextBtn.on('click', () => { if (clearableCurrentPage < totalPages) { clearableCurrentPage++; renderClearableTable(); } });
            $paginationContainer.append($nextBtn);
        };

        // Initialize
        renderClearableTable();
    }

    // ==========================================
    // Two-Factor Auth Page Logic
    // ==========================================
    if ($('#tfa-tabs').length) {
        // Tab Switching Logic
        $('.tfa-tab-btn').on('click', function () {
            const tabId = $(this).attr('id');

            // Update button styles
            $('.tfa-tab-btn').removeClass('bg-[#2563EB] text-white').addClass('text-[#475569] hover:bg-slate-50');
            $(this).removeClass('text-[#475569] hover:bg-slate-50').addClass('bg-[#2563EB] text-white');

            // Hide all content and show selected
            $('.tfa-tab-content').hide();

            if (tabId === 'tab-authenticator') {
                $('#authenticator-tab-content').fadeIn(300);
            } else if (tabId === 'tab-passkeys') {
                $('#passkeys-tab-content').fadeIn(300);
            } else if (tabId === 'tab-recovery') {
                $('#recovery-tab-content').fadeIn(300);
            }
        });

        // Authenticator Setup Logic
        $('#start-setup-btn').on('click', function () {
            $('#authenticator-initial-view').fadeOut(300, function () {
                $('#authenticator-setup-view').fadeIn(300);
            });
        });

        $('#cancel-setup-btn').on('click', function () {
            $('#authenticator-setup-view').fadeOut(300, function () {
                $('#authenticator-initial-view').fadeIn(300);
            });
        });
    }

    // ==========================================
    // Payment Details Page Logic
    // ==========================================
    if ($('#payment-summary-view').length) {
        // Mock Data
        const paymentData = [
            { date: 'May 05, 2026', invoice: '#INV-8821', collected: '$ 2,500', bill: '$ 60', subtotal: '$ 2,440', cod: '$ 25', receivable: '$ 2,415', status: 'Paid' },
            { date: 'May 05, 2026', invoice: '#INV-8822', collected: '$ 2,500', bill: '$ 60', subtotal: '$ 2,440', cod: '$ 25', receivable: '$ 2,415', status: 'Processing' },
            { date: 'May 05, 2026', invoice: '#INV-8823', collected: '$ 2,500', bill: '$ 60', subtotal: '$ 2,440', cod: '$ 25', receivable: '$ 2,415', status: 'Unpaid' },
            { date: 'May 05, 2026', invoice: '#INV-8824', collected: '$ 2,500', bill: '$ 60', subtotal: '$ 2,440', cod: '$ 25', receivable: '$ 2,415', status: 'Paid' },
            { date: 'May 05, 2026', invoice: '#INV-8825', collected: '$ 2,500', bill: '$ 60', subtotal: '$ 2,440', cod: '$ 25', receivable: '$ 2,415', status: 'Paid' },
            { date: 'May 05, 2026', invoice: '#INV-8826', collected: '$ 2,500', bill: '$ 60', subtotal: '$ 2,440', cod: '$ 25', receivable: '$ 2,415', status: 'Paid' },
            { date: 'May 05, 2026', invoice: '#INV-8827', collected: '$ 2,500', bill: '$ 60', subtotal: '$ 2,440', cod: '$ 25', receivable: '$ 2,415', status: 'Processing' },
            { date: 'May 05, 2026', invoice: '#INV-8828', collected: '$ 2,500', bill: '$ 60', subtotal: '$ 2,440', cod: '$ 25', receivable: '$ 2,415', status: 'Unpaid' },
            { date: 'May 05, 2026', invoice: '#INV-8829', collected: '$ 2,500', bill: '$ 60', subtotal: '$ 2,440', cod: '$ 25', receivable: '$ 2,415', status: 'Paid' },
            { date: 'May 05, 2026', invoice: '#INV-8830', collected: '$ 2,500', bill: '$ 60', subtotal: '$ 2,440', cod: '$ 25', receivable: '$ 2,415', status: 'Paid' },
            { date: 'May 06, 2026', invoice: '#INV-8831', collected: '$ 3,000', bill: '$ 70', subtotal: '$ 2,930', cod: '$ 30', receivable: '$ 2,900', status: 'Paid' },
        ];

        let currentPage = 1;
        const rowsPerPage = 5;

        function renderTable(page) {
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const paginatedData = paymentData.slice(start, end);

            let html = '';
            paginatedData.forEach(item => {
                let statusClass = '';
                if (item.status === 'Paid') statusClass = 'bg-emerald-100 text-emerald-600';
                else if (item.status === 'Processing') statusClass = 'bg-orange-100 text-orange-600';
                else statusClass = 'bg-slate-100 text-slate-600';

                html += `
                                <tr>
                                    <td class="px-6 py-6 text-sm text-[#4B5563] font-medium">${item.date}</td>
                                    <td class="px-6 py-6 text-sm text-[#4B5563] font-medium">${item.invoice}</td>
                                    <td class="px-6 py-6 text-sm text-[#1E293B] font-bold">${item.collected}</td>
                                    <td class="px-6 py-6 text-sm text-[#4B5563] font-medium">${item.bill}</td>
                                    <td class="px-6 py-6 text-sm text-[#4B5563] font-medium">${item.subtotal}</td>
                                    <td class="px-6 py-6 text-sm text-[#4B5563] font-medium">${item.cod}</td>
                                    <td class="px-6 py-6 text-sm text-[#1E293B] font-bold">${item.receivable}</td>
                                    <td class="px-6 py-6">
                                        <span class="px-4 py-1.5 rounded-full ${statusClass} text-xs font-bold">${item.status}</span>
                                    </td>
                                    <td class="px-6 py-6 text-center">
                                        <a href="#" class="text-[#003EB7] font-bold text-sm hover:underline">View</a>
                                    </td>
                                </tr>
                            `;
            });
            $('#payment-table-body').html(html);

            // Update pagination info
            const showingStart = paymentData.length === 0 ? 0 : start + 1;
            const showingEnd = Math.min(end, paymentData.length);
            $('#pagination-info').text(`Showing ${showingStart} to ${showingEnd} of ${paymentData.length} entries`);

            renderPagination();
        }

        function renderPagination() {
            const totalPages = Math.ceil(paymentData.length / rowsPerPage);
            let html = `
                            <button class="prev-page w-10 h-10 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">
                                <i class="fas fa-chevron-left text-xs"></i>
                            </button>
                        `;

            for (let i = 1; i <= totalPages; i++) {
                html += `
                                <button class="page-num w-10 h-10 flex items-center justify-center rounded-lg ${i === currentPage ? 'bg-[#003EB7] text-white' : 'border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50'} font-bold text-sm transition-all" data-page="${i}">${i}</button>
                            `;
            }

            html += `
                            <button class="next-page w-10 h-10 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}">
                                <i class="fas fa-chevron-right text-xs"></i>
                            </button>
                        `;
            $('#pagination-controls').html(html);
        }

        // Event Listeners
        $('#view-payments-btn').on('click', function () {
            $('#payment-summary-view').fadeOut(300, function () {
                renderTable(1);
                $('#payment-history-view').fadeIn(300);
            });
        });

        $('#back-to-summary-btn').on('click', function () {
            $('#payment-history-view').fadeOut(300, function () {
                $('#payment-summary-view').fadeIn(300);
            });
        });

        $('#view-parcel-details-btn').on('click', function () {
            $('#payment-summary-view').fadeOut(300, function () {
                $('#parcel-details-view').fadeIn(300);
            });
        });

        $('#back-from-parcel-btn').on('click', function () {
            $('#parcel-details-view').fadeOut(300, function () {
                $('#payment-summary-view').fadeIn(300);
            });
        });

        $(document).on('click', '.page-num', function () {
            currentPage = parseInt($(this).attr('data-page'));
            renderTable(currentPage);
        });

        $(document).on('click', '.prev-page', function () {
            if (currentPage > 1) {
                currentPage--;
                renderTable(currentPage);
            }
        });

        $(document).on('click', '.next-page', function () {
            const totalPages = Math.ceil(paymentData.length / rowsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(currentPage);
            }
        });

        // Initial render
        renderTable(1);
    }

    // ==========================================
    // Mobile Banking / Settings Page Logic
    // ==========================================
    if ($('.settings-tab-btn').length) {
        $('.settings-tab-btn').on('click', function (e) {
            e.preventDefault();
            var tabId = $(this).attr('id');

            // Update active button styling
            $('.settings-tab-btn').removeClass('bg-[#2563EB] text-white').addClass('text-[#475569] hover:bg-slate-50');
            $(this).removeClass('text-[#475569] hover:bg-slate-50').addClass('bg-[#2563EB] text-white');

            // Toggle tab contents
            $('.settings-tab-content').hide();

            if (tabId === 'tab-bank-account') {
                $('#bank-account-content').show();
                $('#bank-account-update-view').hide();
                $('#bank-account-main-view').fadeIn(300);
            } else if (tabId === 'tab-mobile-banking') {
                $('#mobile-banking-content').show();
                $('#mobile-banking-update-view').hide();
                $('#mobile-banking-main-view').fadeIn(300);
            } else if (tabId === 'tab-payment-method') {
                $('#payment-method-content').fadeIn(300);
            } else if (tabId === 'tab-business-profile') {
                // Always reset to main view when clicking the tab
                $('#business-profile-content').show();
                $('#business-profile-change-name-view').hide();
                $('#business-profile-update-address-view').hide();
                $('#business-profile-main-view').fadeIn(300);
            } else if (tabId === 'tab-label-printing') {
                $('#label-printing-content').fadeIn(300);
            }
        });

        // Bank Account - Update Toggles
        $('#btn-edit-bank-account').on('click', function () {
            $('#bank-account-main-view').fadeOut(200, function () {
                $('#bank-account-update-view').fadeIn(300);
            });
        });

        $('#btn-cancel-bank-account').on('click', function () {
            $('#bank-account-update-view').fadeOut(200, function () {
                $('#bank-account-main-view').fadeIn(300);
            });
        });

        // Mobile Banking - Update Toggles
        $('#btn-edit-mobile-banking').on('click', function () {
            $('#mobile-banking-main-view').fadeOut(200, function () {
                $('#mobile-banking-update-view').fadeIn(300);
            });
        });

        $('#btn-cancel-mobile-banking').on('click', function () {
            $('#mobile-banking-update-view').fadeOut(200, function () {
                $('#mobile-banking-main-view').fadeIn(300);
            });
        });

        // Business Profile - Change Company Name Toggles
        $('#btn-change-company-name').on('click', function () {
            $('#business-profile-main-view').fadeOut(200, function () {
                $('#business-profile-change-name-view').fadeIn(300);
            });
        });

        $('#btn-back-business-profile').on('click', function () {
            $('#business-profile-change-name-view').fadeOut(200, function () {
                $('#business-profile-main-view').fadeIn(300);
            });
        });

        // Business Profile - Update Address Toggles
        $('#btn-update-address').on('click', function () {
            $('#business-profile-main-view').fadeOut(200, function () {
                $('#business-profile-update-address-view').fadeIn(300);
            });
        });

        $('#btn-back-from-address').on('click', function () {
            $('#business-profile-update-address-view').fadeOut(200, function () {
                $('#business-profile-main-view').fadeIn(300);
            });
        });

        // Label Printing Selection
        $('.label-option-card').on('click', function () {
            // Reset all
            $('.label-option-card')
                .removeClass('border-[#2563EB]')
                .addClass('border-[#E2E8F0]');

            $('.label-option-card .label-dashed-box')
                .removeClass('border-[#2563EB]')
                .addClass('border-[#CBD5E1]');

            $('.label-option-card .label-dashed-text')
                .removeClass('text-[#1E293B]')
                .addClass('text-[#64748B]');

            $('.label-option-card .label-check-circle')
                .removeClass('bg-[#003EB7] border-transparent')
                .addClass('border border-[#CBD5E1] bg-white')
                .empty();

            // Set Active
            $(this)
                .removeClass('border-[#E2E8F0]')
                .addClass('border-[#2563EB]');

            $(this).find('.label-dashed-box')
                .removeClass('border-[#CBD5E1]')
                .addClass('border-[#2563EB]');

            $(this).find('.label-dashed-text')
                .removeClass('text-[#64748B]')
                .addClass('text-[#1E293B]');

            $(this).find('.label-check-circle')
                .removeClass('border border-[#CBD5E1] bg-white')
                .addClass('bg-[#003EB7] border-transparent')
                .html('<i class="fas fa-check text-white text-[10px]"></i>');
        });
    }

    // ==========================================
    // Create Parcel Form Logic
    // ==========================================
    const $serviceTabs = $('.dashboard-container .bg-white.rounded-2xl button');
    if ($serviceTabs.length > 0) {
        $serviceTabs.on('click', function () {
            $serviceTabs.removeClass('bg-[#003EB7] text-white shadow-lg shadow-blue-100').addClass('text-[#64748B] hover:bg-slate-50');
            $(this).addClass('bg-[#003EB7] text-white shadow-lg shadow-blue-100').removeClass('text-[#64748B] hover:bg-slate-50');
        });
    }

    // ==========================================
    // Pickup Request Page Logic
    // ==========================================
    const $pickupTable = $('.pickup-table');
    if ($pickupTable.length) {
        const pickupData = [
            { sl: '01', date: '05-03-2026', address: 'Dhanmondi 27, Dhaka', status: 'Pending', rider: 'Not Assigned' },
            { sl: '02', date: '05-01-2026', address: 'Uttara Sector 10, Dhaka', status: 'Assigned', rider: 'Rakib Hasan' },
            { sl: '03', date: '05-01-2026', address: 'Uttara Sector 10, Dhaka', status: 'Assigned', rider: 'Arif Hossain' },
            { sl: '04', date: '05-01-2026', address: 'Uttara Sector 10, Dhaka', status: 'Pending', rider: 'S.M. Kamrul' },
            { sl: '05', date: '04-12-2026', address: 'Gulshan 1, Dhaka', status: 'Assigned', rider: 'M. Ali' },
            { sl: '06', date: '04-10-2026', address: 'Banani 11, Dhaka', status: 'Pending', rider: 'Not Assigned' },
            { sl: '07', date: '04-08-2026', address: 'Mirpur 10, Dhaka', status: 'Assigned', rider: 'Sohail Rana' },
            { sl: '08', date: '04-05-2026', address: 'Bashundhara R/A, Dhaka', status: 'Pending', rider: 'Not Assigned' },
        ];

        // Generating dummy data to fill 45 entries as per UI
        for (let i = 9; i <= 45; i++) {
            pickupData.push({
                sl: i.toString().padStart(2, '0'),
                date: `03-${(i % 28 + 1).toString().padStart(2, '0')}-2026`,
                address: i % 2 === 0 ? 'Mohakhali DOHS, Dhaka' : 'Malibagh, Dhaka',
                status: i % 3 === 0 ? 'Pending' : 'Assigned',
                rider: i % 3 === 0 ? 'Not Assigned' : 'Hossain Khan'
            });
        }

        let currentPickupPage = 1;
        const pickupRowsPerPage = 10;

        const renderPickupTable = () => {
            const $tbody = $pickupTable.find('tbody');
            $tbody.empty();

            const start = (currentPickupPage - 1) * pickupRowsPerPage;
            const end = start + pickupRowsPerPage;
            const paginatedData = pickupData.slice(start, end);

            $.each(paginatedData, function (index, item) {
                const $tr = $('<tr></tr>');
                if (index < paginatedData.length - 1) $tr.addClass('border-b border-[#F1F5F9]');

                $tr.html(`
                        <td class="px-6 py-6 text-gray-medium">${item.sl}</td>
                        <td class="px-6 py-6 text-gray-medium">${item.date}</td>
                        <td class="px-6 py-6 text-dark-contrast">${item.address}</td>
                        <td class="px-6 py-6">
                            <span class="badge badge-${item.status.toLowerCase()}">${item.status}</span>
                        </td>
                        <td class="px-6 py-6 ${item.rider === 'Not Assigned' ? 'text-gray-medium' : 'text-dark-contrast'}">${item.rider}</td>
                    `);
                $tbody.append($tr);
            });

            // Update Info
            const $info = $('#track-pagination-info');
            if ($info.length) {
                $info.html(`Showing <span class="font-medium">${start + 1}</span> to <span class="font-medium">${Math.min(end, pickupData.length)}</span> of <span class="font-medium">${pickupData.length}</span> entries`);
            }

            renderPickupPagination();
        };

        const renderPickupPagination = () => {
            const $container = $('#track-pagination-container');
            if (!$container.length) return;
            $container.empty();

            const totalPages = Math.ceil(pickupData.length / pickupRowsPerPage);
            if (totalPages <= 1) return;

            // Prev
            const $prevBtn = $('<button></button>');
            $prevBtn.addClass(`pagination-btn ${currentPickupPage === 1 ? 'disabled' : ''}`);
            $prevBtn.html('<i class="fas fa-chevron-left"></i>');
            $prevBtn.on('click', () => { if (currentPickupPage > 1) { currentPickupPage--; renderPickupTable(); } });
            $container.append($prevBtn);

            const isMobile = $(window).width() < 475;
            const pages = getPaginationPages(currentPickupPage, totalPages, isMobile);

            pages.forEach(p => {
                if (p.type === 'page') {
                    const $btn = $('<button></button>');
                    $btn.addClass(`pagination-btn ${currentPickupPage === p.value ? 'active' : ''}`);
                    $btn.text(p.value);
                    $btn.on('click', () => { currentPickupPage = p.value; renderPickupTable(); });
                    $container.append($btn);
                } else if (p.type === 'dots') {
                    const $dots = $('<span></span>');
                    $dots.addClass('px-2 self-center text-gray-400');
                    $dots.text('...');
                    $container.append($dots);
                }
            });

            // Next
            const $nextBtn = $('<button></button>');
            $nextBtn.addClass(`pagination-btn ${currentPickupPage === totalPages ? 'disabled' : ''}`);
            $nextBtn.html('<i class="fas fa-chevron-right"></i>');
            $nextBtn.on('click', () => { if (currentPickupPage < totalPages) { currentPickupPage++; renderPickupTable(); } });
            $container.append($nextBtn);
        };

        renderPickupTable();
    }

    // ==========================================
    // Moderator Page Logic
    // ==========================================
    const $moderatorTable = $('.moderator-table');
    if ($moderatorTable.length) {
        const moderatorData = [
            { id: 'MOD1001', name: 'Rahim Uddin', email: 'rahim@comp...', phone: '01711123456', date: '2026-04-20', status: 'Active', permission: 'Full Access' },
            { id: 'MOD1002', name: 'Nusrat Jahan', email: 'nusrat@comp...', phone: '01822234567', date: '2026-04-22', status: 'Inactive', permission: 'Order Management' },
            { id: 'MOD1003', name: 'Tanvir Hasan', email: 'tanvir@comp...', phone: '01933345678', date: '2026-04-25', status: 'Active', permission: 'Viewer' },
            { id: 'MOD1004', name: 'Sadia Islam', email: 'sadia@comp...', phone: '01644456789', date: '2026-04-28', status: 'Active', permission: 'Finance' },
        ];

        // Generating dummy data for pagination demonstration
        const names = ['Ariful Islam', 'Kamrun Nahar', 'Mehedi Hasan', 'Sumaiya Akter', 'Rakibul Islam'];
        const permissions = ['Full Access', 'Order Management', 'Viewer', 'Finance'];

        for (let i = 5; i <= 25; i++) {
            moderatorData.push({
                id: `MOD${1000 + i}`,
                name: names[i % names.length],
                email: `${names[i % names.length].toLowerCase().replace(' ', '')}@comp...`,
                phone: `017${Math.floor(Math.random() * 90000000 + 10000000)}`,
                date: `2026-05-${(i % 28 + 1).toString().padStart(2, '0')}`,
                status: i % 5 === 0 ? 'Inactive' : 'Active',
                permission: permissions[i % permissions.length]
            });
        }

        let currentModPage = 1;
        const modRowsPerPage = 8;

        const renderModeratorTable = () => {
            const $tbody = $moderatorTable.find('tbody');
            $tbody.empty();

            const start = (currentModPage - 1) * modRowsPerPage;
            const end = start + modRowsPerPage;
            const paginatedData = moderatorData.slice(start, end);

            $.each(paginatedData, function (index, item) {
                const $tr = $('<tr></tr>');
                if (index < paginatedData.length - 1) $tr.addClass('border-b border-[#F1F5F9]');

                $tr.html(`
                        <td class="px-6 py-6 text-gray-medium">${item.id}</td>
                        <td class="px-6 py-6 text-dark-contrast font-medium">${item.name}</td>
                        <td class="px-6 py-6 text-gray-medium">${item.email}</td>
                        <td class="px-6 py-6 text-gray-medium">${item.phone}</td>
                        <td class="px-6 py-6 text-gray-medium">${item.date}</td>
                        <td class="px-6 py-6 text-center">
                            <span class="badge badge-${item.status.toLowerCase()}">${item.status}</span>
                        </td>
                        <td class="px-6 py-6 text-gray-medium">${item.permission}</td>
                        <td class="px-6 py-6 text-center">
                            <button class="edit-moderator-btn text-[#64748B] hover:text-[#003EB7] transition-all">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M3 22H21" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </td>
                    `);
                $tbody.append($tr);

                // Add Event Listener to Edit Button
                $tr.find('.edit-moderator-btn').on('click', () => {
                    $listView.hide();
                    $addView.show();
                });
            });

            // Update Info
            const $info = $('#pagination-info');
            if ($info.length) {
                $info.html(`Showing <span class="font-medium">${start + 1}</span> to <span class="font-medium">${Math.min(end, moderatorData.length)}</span> of <span class="font-medium">${moderatorData.length}</span> entries`);
            }

            renderModPagination();
        };

        const renderModPagination = () => {
            const $container = $('#pagination-container');
            if (!$container.length) return;
            $container.empty();

            const totalPages = Math.ceil(moderatorData.length / modRowsPerPage);
            if (totalPages <= 1) return;

            // Prev
            const $prevBtn = $('<button></button>');
            $prevBtn.addClass(`pagination-btn ${currentModPage === 1 ? 'disabled' : ''}`);
            $prevBtn.html('<i class="fas fa-chevron-left"></i>');
            $prevBtn.on('click', () => { if (currentModPage > 1) { currentModPage--; renderModeratorTable(); } });
            $container.append($prevBtn);

            const isMobile = $(window).width() < 475;
            const pages = getPaginationPages(currentModPage, totalPages, isMobile);

            pages.forEach(p => {
                if (p.type === 'page') {
                    const $btn = $('<button></button>');
                    $btn.addClass(`pagination-btn ${currentModPage === p.value ? 'active' : ''}`);
                    $btn.text(p.value);
                    $btn.on('click', () => { currentModPage = p.value; renderModeratorTable(); });
                    $container.append($btn);
                } else if (p.type === 'dots') {
                    const $dots = $('<span></span>');
                    $dots.addClass('px-2 self-center text-gray-400');
                    $dots.text('...');
                    $container.append($dots);
                }
            });

            // Next
            const $nextBtn = $('<button></button>');
            $nextBtn.addClass(`pagination-btn ${currentModPage === totalPages ? 'disabled' : ''}`);
            $nextBtn.html('<i class="fas fa-chevron-right"></i>');
            $nextBtn.on('click', () => { if (currentModPage < totalPages) { currentModPage++; renderModeratorTable(); } });
            $container.append($nextBtn);
        };

        // View Switching Logic
        const $listView = $('#moderator-list');
        const $addView = $('#add-moderator');
        const $showAddBtn = $('#show-add-moderator');

        if ($showAddBtn.length) {
            $showAddBtn.on('click', () => {
                $listView.hide();
                $addView.show();
            });
        }

        // Add Moderator Form Mock Logic
        const $addModForm = $('#add-moderator-form');
        if ($addModForm.length) {
            $addModForm.on('submit', (e) => {
                e.preventDefault();
                alert('Moderator added successfully!');
                $addView.hide();
                $listView.show();
            });
        }

        renderModeratorTable();
    }

    // ==========================================
    // Modal Logic (General)
    // ==========================================
    const $registerModal = $('#register-modal');
    const $openModalBtn = $('#open-register-modal');
    const $closeModalBtn = $('#close-register-modal');

    if ($registerModal.length && $openModalBtn.length) {
        $openModalBtn.on('click', () => {
            $registerModal.css('display', 'flex').addClass('active');
            $('body').css('overflow', 'hidden'); // Prevent scroll
        });

        const closeModal = () => {
            $registerModal.hide().removeClass('active');
            $('body').css('overflow', '');
        };

        if ($closeModalBtn.length) $closeModalBtn.on('click', closeModal);

        // Close on click outside
        $registerModal.on('click', (e) => {
            if (e.target === $registerModal[0]) closeModal();
        });

        // Form Submit (Mock)
        const $registerForm = $('#moderator-register-form');
        if ($registerForm.length) {
            $registerForm.on('submit', (e) => {
                e.preventDefault();
                alert('Moderator registered successfully!');
                closeModal();
            });
        }
    }
    // Track Parcel Logic
    // ==========================================
    const $trackTable = $('#track-parcel-table');
    const trackData = [
        { date: '2026-04-21', code: 'TRK5821A9', name: 'Rahim Uddin', cod: 1200, status: 'Active', charge: 75, rider: 'Delivered' },
        { date: '2026-04-21', code: 'TRK5821A9', name: 'Nusrat Jahan', cod: 1300, status: 'Inactive', charge: 80, rider: 'Delivered' },
        { date: '2026-04-21', code: 'TRK5821A9', name: 'Tanvir Hasan', cod: 1200, status: 'Active', charge: 75, rider: 'Delivered' },
        { date: '2026-04-21', code: 'TRK5821A9', name: 'Sadia Islam', cod: 1200, status: 'Inactive', charge: 75, rider: 'Delivered' },
        { date: '2026-04-22', code: 'TRK5821B2', name: 'Abdur Rahman', cod: 1500, status: 'Active', charge: 90, rider: 'Delivered' },
        { date: '2026-04-22', code: 'TRK5821C5', name: 'Farzana Akter', cod: 1100, status: 'Active', charge: 70, rider: 'Delivered' },
        { date: '2026-04-23', code: 'TRK5821D8', name: 'Jasim Uddin', cod: 1400, status: 'Inactive', charge: 85, rider: 'Delivered' },
        { date: '2026-04-23', code: 'TRK5821E1', name: 'Mehedi Hasan', cod: 1250, status: 'Active', charge: 75, rider: 'Delivered' },
        { date: '2026-04-24', code: 'TRK5821F4', name: 'Sultana Begum', cod: 1350, status: 'Inactive', charge: 80, rider: 'Delivered' },
        { date: '2026-04-24', code: 'TRK5821G7', name: 'Kamrul Islam', cod: 1200, status: 'Active', charge: 75, rider: 'Delivered' }
    ];

    if ($trackTable.length) {
        let filteredTrackData = [...trackData];
        let currentTrackPage = 1;
        const trackRowsPerPage = 8;

        const renderTrackTable = () => {
            const $tbody = $trackTable.find('tbody');
            if (!$tbody.length) return;
            $tbody.empty();

            const start = (currentTrackPage - 1) * trackRowsPerPage;
            const end = start + trackRowsPerPage;
            const paginatedData = filteredTrackData.slice(start, end);

            $.each(paginatedData, function (index, item) {
                const $tr = $('<tr></tr>');
                if (index < paginatedData.length - 1) $tr.addClass('border-b border-[#F1F5F9]');

                const statusClass = item.status === 'Active' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFF3E0] text-[#EF6C00]';

                // Format date for display
                const displayDate = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                $tr.html(`
                        <td class="px-6 py-6 text-[#64748B] font-medium text-sm">${displayDate}</td>
                        <td class="px-6 py-6 text-[#64748B] font-medium text-sm">${item.code}</td>
                        <td class="px-6 py-6 text-[#1E293B] font-bold text-sm">${item.name}</td>
                        <td class="px-6 py-6 text-[#64748B] font-medium text-sm">${item.cod} $</td>
                        <td class="px-6 py-6">
                            <span class="px-4 py-1.5 rounded-full text-xs font-bold ${statusClass}">${item.status}</span>
                        </td>
                        <td class="px-6 py-6">
                            <a href="#" class="text-[#003EB7] font-bold text-sm underline hover:text-[#002D87] transition-all">Track</a>
                        </td>
                    `);
                $tbody.append($tr);
            });

            // Update Info
            const $info = $('#track-pagination-info');
            if ($info.length) {
                $info.html(`Showing <span class="font-medium">${start + 1}</span> to <span class="font-medium">${Math.min(end, filteredTrackData.length)}</span> of <span class="font-medium">${filteredTrackData.length}</span> entries`);
            }

            renderTrackPagination();
        };

        const renderTrackPagination = () => {
            const $container = $('#track-pagination-container');
            if (!$container.length) return;
            $container.empty();

            const totalPages = Math.ceil(filteredTrackData.length / trackRowsPerPage);
            if (totalPages <= 1) return;

            // Prev
            const $prevBtn = $('<button></button>');
            $prevBtn.addClass(`pagination-btn ${currentTrackPage === 1 ? 'disabled' : ''}`);
            $prevBtn.html('<i class="fas fa-chevron-left"></i>');
            $prevBtn.on('click', () => { if (currentTrackPage > 1) { currentTrackPage--; renderTrackTable(); } });
            $container.append($prevBtn);

            const isMobile = $(window).width() < 475;
            const pages = getPaginationPages(currentTrackPage, totalPages, isMobile);

            pages.forEach(p => {
                if (p.type === 'page') {
                    const $btn = $('<button></button>');
                    $btn.addClass(`pagination-btn ${currentTrackPage === p.value ? 'active' : ''}`);
                    $btn.text(p.value);
                    $btn.on('click', () => { currentTrackPage = p.value; renderTrackTable(); });
                    $container.append($btn);
                } else if (p.type === 'dots') {
                    const $dots = $('<span></span>');
                    $dots.addClass('px-2 self-center text-gray-400');
                    $dots.text('...');
                    $container.append($dots);
                }
            });

            // Next
            const $nextBtn = $('<button></button>');
            $nextBtn.addClass(`pagination-btn ${currentTrackPage === totalPages ? 'disabled' : ''}`);
            $nextBtn.html('<i class="fas fa-chevron-right"></i>');
            $nextBtn.on('click', () => { if (currentTrackPage < totalPages) { currentTrackPage++; renderTrackTable(); } });
            $container.append($nextBtn);
        };

        // Search Logic
        const $searchInput = $('#track-search-input');
        if ($searchInput.length) {
            $searchInput.on('input', (e) => {
                const term = $(e.target).val().toLowerCase();
                filteredTrackData = trackData.filter(item =>
                    item.code.toLowerCase().includes(term) ||
                    item.name.toLowerCase().includes(term)
                );
                currentTrackPage = 1;
                renderTrackTable();
            });
        }

        renderTrackTable();
    }

    // ==========================================
    // Pick Date Modal Logic
    // ==========================================
    const $dateModal = $('#date-modal');
    const $openDateModalBtn = $('#open-date-modal');
    const $closeDateModalBtn = $('#close-date-modal');
    const $cancelDateModalBtn = $('#cancel-date-modal');
    const $dateTimeForm = $('#date-time-form');

    if ($dateModal.length && $openDateModalBtn.length) {
        const openModal = () => {
            $dateModal.css('display', 'flex');
            setTimeout(() => $dateModal.addClass('active'), 10);
            $('body').css('overflow', 'hidden');

            const now = new Date();
            const today = now.toISOString().split('T')[0];
            const startTime = "00:00";
            const endTime = now.toTimeString().split(' ')[0].substring(0, 5);

            $('#selected-from-date').val(today);
            $('#selected-from-time').val(startTime);
            $('#selected-to-date').val(today);
            $('#selected-to-time').val(endTime);
        };

        const closeModal = () => {
            $dateModal.removeClass('active');
            setTimeout(() => {
                $dateModal.hide();
            }, 300);
            $('body').css('overflow', '');
        };

        $openDateModalBtn.on('click', openModal);
        if ($closeDateModalBtn.length) $closeDateModalBtn.on('click', closeModal);
        if ($cancelDateModalBtn.length) $cancelDateModalBtn.on('click', closeModal);

        // Close on click outside
        $dateModal.on('click', (e) => {
            if (e.target === $dateModal[0]) closeModal();
        });

        // Form Submit
        if ($dateTimeForm.length) {
            $dateTimeForm.on('submit', (e) => {
                e.preventDefault();

                const fromDateStr = $('#selected-from-date').val();
                const fromTimeStr = $('#selected-from-time').val();
                const toDateStr = $('#selected-to-date').val();
                const toTimeStr = $('#selected-to-time').val();

                const fromDT = new Date(`${fromDateStr}T${fromTimeStr}`);
                const toDT = new Date(`${toDateStr}T${toTimeStr}`);

                const formatDT = (dt) => {
                    const dateStr = dt.toLocaleDateString('en-CA').replace(/-/g, '/');
                    const timeStr = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
                    return `${dateStr} , ${timeStr}`;
                };

                // Update display labels
                $('#display-from-date').text(formatDT(fromDT));
                $('#display-to-date').text(formatDT(toDT));

                // Switch views
                $('#track-summary-view').hide();
                $('#track-filtered-view').show();

                // FILTER THE DATA DYNAMICALLY
                const filteredData = trackData.filter(item => {
                    const itemDT = new Date(item.date);
                    return itemDT >= new Date(fromDateStr) && itemDT <= new Date(toDateStr);
                });

                // Populate Table
                const $filteredTbody = $('#filtered-track-table tbody');
                $filteredTbody.empty();

                let totalCOD = 0;

                $.each(filteredData, function (index, item) {
                    const $tr = $('<tr></tr>');
                    if (index < filteredData.length - 1) $tr.addClass('border-b border-[#F1F5F9]');

                    const displayDate = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    totalCOD += item.cod;

                    $tr.html(`
                            <td class="px-6 py-6 text-[#64748B] font-medium text-sm">${displayDate}</td>
                            <td class="px-6 py-6 text-[#64748B] font-medium text-sm">${item.code}</td>
                            <td class="px-6 py-6 text-[#1E293B] font-bold text-sm">${item.name}</td>
                            <td class="px-6 py-6 text-[#64748B] font-medium text-sm">${item.cod} $</td>
                            <td class="px-6 py-6 text-[#64748B] font-medium text-sm">${item.charge} $</td>
                            <td class="px-6 py-6">
                                <span class="bg-[#E8F5E9] text-[#2E7D32] px-4 py-1.5 rounded-full text-xs font-bold">${item.rider}</span>
                            </td>
                            <td class="px-6 py-6 text-center">
                                <a href="#" class="text-[#003EB7] font-bold text-sm underline hover:text-[#002D87] transition-all">Track</a>
                            </td>
                        `);
                    $filteredTbody.append($tr);
                });

                // Update stats
                $('#total-parcels-count').text(filteredData.length);
                $('#total-cod-amount').text(`${totalCOD} TK`);

                closeModal();
            });
        }

        // Back to summary logic
        const $backBtn = $('#back-to-summary');
        if ($backBtn.length) {
            $backBtn.on('click', () => {
                $('#track-filtered-view').hide();
                $('#track-summary-view').show();
            });
        }
    }

    // ==========================================
    // Cancellation Request Page Logic
    // ==========================================
    const $cancellationTable = $('.cancellation-table');
    if ($cancellationTable.length) {
        const cancellationData = [];
        // First few rows match the image exactly
        for (let i = 1; i <= 4; i++) {
            cancellationData.push({
                date: `Apr 21, 2026`,
                id: `MOD1001`,
                name: `Rahim Uddin`,
                payment: `$ 12,000`,
                charge: `$ 80`,
                details: 'View',
                action: 'Accept'
            });
        }
        // Fill rest with dummy data (Total 45 entries)
        const names = ['Karim Sheikh', 'Sadia Islam', 'A. Karim', 'Rafiqul Islam', 'Nusrat Jahan'];
        for (let i = 5; i <= 45; i++) {
            cancellationData.push({
                date: `Apr 22, 2026`,
                id: `MOD${1000 + i}`,
                name: names[i % names.length],
                payment: `$ ${Math.floor(Math.random() * 10000) + 1000}`,
                charge: `$ ${Math.floor(Math.random() * 100) + 20}`,
                details: 'View',
                action: 'Accept'
            });
        }

        let currentCancelPage = 1;
        const cancelRowsPerPage = 10;

        const renderCancellationTable = () => {
            const $tbody = $('#cancellation-table-body');
            if (!$tbody.length) return;
            $tbody.empty();

            const start = (currentCancelPage - 1) * cancelRowsPerPage;
            const end = start + cancelRowsPerPage;
            const paginatedData = cancellationData.slice(start, end);

            $.each(paginatedData, function (index, item) {
                const $tr = $('<tr></tr>');
                $tr.html(`
                    <td class="text-[#64748B] font-medium">${item.date}</td>
                    <td class="font-bold text-[#111827]">${item.id}</td>
                    <td class="text-[#1E293B] font-bold text-sm">${item.name}</td>
                    <td class="text-[#64748B] font-medium">${item.payment}</td>
                    <td class="text-[#64748B] font-medium">${item.charge}</td>
                    <td>
                        <a href="#" class="details-view-link">${item.details}</a>
                    </td>
                    <td class="text-center">
                        <button class="btn-action-accept">${item.action}</button>
                    </td>
                `);
                $tbody.append($tr);
            });

            // Update Info
            const $info = $('#cancellation-pagination-info');
            if ($info.length) {
                $info.html(`Showing <span class="font-bold text-[#111827]">${start + 1}</span> to <span class="font-bold text-[#111827]">${Math.min(end, cancellationData.length)}</span> of <span class="font-bold text-[#111827]">${cancellationData.length}</span> entries`);
            }

            renderCancellationPagination();
        };

        const renderCancellationPagination = () => {
            const $container = $('#cancellation-pagination-container');
            if (!$container.length) return;
            $container.empty();

            const totalPages = Math.ceil(cancellationData.length / cancelRowsPerPage);
            if (totalPages <= 1) return;

            // Previous Button
            const $prevBtn = $('<button></button>');
            $prevBtn.addClass(`pagination-btn ${currentCancelPage === 1 ? 'disabled' : ''}`);
            $prevBtn.html('<i class="fas fa-chevron-left"></i>');
            $prevBtn.on('click', () => { if (currentCancelPage > 1) { currentCancelPage--; renderCancellationTable(); } });
            $container.append($prevBtn);

            const isMobile = $(window).width() < 475;
            const pages = getPaginationPages(currentCancelPage, totalPages, isMobile);

            pages.forEach(p => {
                if (p.type === 'page') {
                    const $pageBtn = $('<button></button>');
                    $pageBtn.addClass(`pagination-btn ${currentCancelPage === p.value ? 'active' : ''}`);
                    $pageBtn.text(p.value);
                    $pageBtn.on('click', () => { currentCancelPage = p.value; renderCancellationTable(); });
                    $paginationContainer.append($pageBtn);
                } else if (p.type === 'dots') {
                    const $dots = $('<span></span>');
                    $dots.addClass('px-2 self-center text-[#94A3B8]');
                    $dots.text('...');
                    $paginationContainer.append($dots);
                }
            });

            // Next Button
            const $nextBtn = $('<button></button>');
            $nextBtn.addClass(`pagination-btn ${currentCancelPage === totalPages ? 'disabled' : ''}`);
            $nextBtn.html('<i class="fas fa-chevron-right"></i>');
            $nextBtn.on('click', () => { if (currentCancelPage < totalPages) { currentCancelPage++; renderCancellationTable(); } });
            $container.append($nextBtn);
        };

        // Filter switching
        $('.cancellation-filter-tab').on('click', function () {
            $('.cancellation-filter-tab').removeClass('active');
            $(this).addClass('active');
            currentCancelPage = 1;
            renderCancellationTable();
        });

        renderCancellationTable();
    }

    // ==========================================
    // Settings Page Edit Logic
    // ==========================================
    const $mainCard = $('#settings-main-card');
    const $editCard = $('#settings-edit-card');
    const $editTitle = $('#edit-card-title');
    const $labelCurrent = $('#label-current');
    const $labelNew = $('#label-new');
    const $inputCurrent = $('#input-current');
    const $inputNew = $('#input-new');

    $('.edit-trigger').on('click', function () {
        const field = $(this).data('field');
        const value = $(this).data('value');

        // Update Edit Card Content based on field
        if ($editTitle.length) $editTitle.text('Change ' + field);

        if (field.includes('Phone') || field.includes('Number')) {
            $labelCurrent.text('Prime Phone Number');
            $labelNew.text('Add New Primary Phone');
            $inputNew.attr('placeholder', '01XXXXXXXXX');
            $('#btn-submit').text('Send OTP to current phone');
        } else if (field === 'Email') {
            $labelCurrent.text('Current Email');
            $labelNew.text('New Email Address');
            $inputNew.attr('placeholder', 'example@gmail.com');
            $('#btn-submit').text('Update Email');
        } else if (field === 'Company Name' || field === 'Owner Name') {
            $labelCurrent.text('Current ' + field);
            $labelNew.text('New ' + field);
            $inputNew.attr('placeholder', 'Enter new ' + field.toLowerCase());
            $('#btn-submit').text('Update ' + field);
        } else if (field === 'Address') {
            $labelCurrent.text('Current Address');
            $labelNew.text('New Address');
            $inputNew.attr('placeholder', 'Enter new address');
            $('#btn-submit').text('Update Address');
        }

        $inputCurrent.val(value);
        $inputNew.val('');

        // Show Edit Card with Animation
        $mainCard.css({
            'transition': 'all 0.3s ease',
            'opacity': '0',
            'transform': 'translateY(-10px)'
        });

        setTimeout(() => {
            $mainCard.hide();
            $editCard.show().css({
                'display': 'block',
                'opacity': '0',
                'transform': 'translateY(10px)'
            });

            // Trigger reflow
            // Trigger reflow using jQuery
            $editCard.height();

            $editCard.css({
                'transition': 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 300);
    });

    $('#btn-back, #btn-cancel').on('click', function () {
        if ($(this).attr('id') === 'btn-cancel' && $(this).text() === 'View Change History') {
            // Placeholder for change history
            return;
        }

        $editCard.css({
            'transition': 'all 0.3s ease',
            'opacity': '0',
            'transform': 'translateY(10px)'
        });

        setTimeout(() => {
            $editCard.hide();
            $mainCard.show().css({
                'opacity': '0',
                'transform': 'translateY(-10px)'
            });

            // Trigger reflow using jQuery
            $mainCard.height();

            $mainCard.css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 300);
    });

    // My Orders Page Logic is handled below in the My Orders Page Pagination Logic section.

    // ==========================================
    // Login History Page Logic
    // ==========================================
    if ($('.table-card h3:contains("Login History")').length) {
        const loginData = [
            { status: 'Success', statusClass: 'bg-[#D1FAE5] text-[#059669]', dateTime: '05-03-2026 . 03:17 PM', relativeTime: '30 min ago', ip: '103.95.209.0', browser: 'Chrome', os: 'Windows', device: 'Desktop' },
            { status: 'Success', statusClass: 'bg-[#D1FAE5] text-[#059669]', dateTime: '05-03-2026 . 11:24 AM', relativeTime: '4 hours ago', ip: '103.95.209.0', browser: 'Chrome', os: 'Windows', device: 'Desktop' },
            { status: 'Success', statusClass: 'bg-[#D1FAE5] text-[#059669]', dateTime: '05-03-2026 . 03:17 PM', relativeTime: '30 min ago', ip: '103.95.209.0', browser: 'Chrome', os: 'Windows', device: 'Desktop' },
            { status: 'Success', statusClass: 'bg-[#D1FAE5] text-[#059669]', dateTime: '05-03-2026 . 03:17 PM', relativeTime: '30 min ago', ip: '103.95.209.0', browser: 'Chrome', os: 'Windows', device: 'Desktop' },
            { status: 'Success', statusClass: 'bg-[#D1FAE5] text-[#059669]', dateTime: '05-03-2026 . 03:17 PM', relativeTime: '30 min ago', ip: '103.95.209.0', browser: 'Chrome', os: 'Windows', device: 'Desktop' },
            { status: 'Success', statusClass: 'bg-[#D1FAE5] text-[#059669]', dateTime: '05-03-2026 . 03:17 PM', relativeTime: '30 min ago', ip: '103.95.209.0', browser: 'Chrome', os: 'Windows', device: 'Desktop' },
            { status: 'Failed', statusClass: 'bg-red-100 text-red-600', dateTime: '05-02-2026 . 09:15 PM', relativeTime: '1 day ago', ip: '103.95.209.12', browser: 'Firefox', os: 'Windows', device: 'Desktop' },
            { status: 'Success', statusClass: 'bg-[#D1FAE5] text-[#059669]', dateTime: '05-02-2026 . 08:30 AM', relativeTime: '1 day ago', ip: '103.95.209.0', browser: 'Chrome', os: 'Windows', device: 'Desktop' },
            { status: 'Success', statusClass: 'bg-[#D1FAE5] text-[#059669]', dateTime: '05-01-2026 . 04:45 PM', relativeTime: '2 days ago', ip: '103.95.209.0', browser: 'Chrome', os: 'Windows', device: 'Desktop' },
            { status: 'Success', statusClass: 'bg-[#D1FAE5] text-[#059669]', dateTime: '05-01-2026 . 02:10 PM', relativeTime: '2 days ago', ip: '103.95.209.0', browser: 'Safari', os: 'iOS', device: 'Mobile' }
        ];

        // Generate additional dummy entries to total 35 entries for demonstration of pagination
        for (let i = 11; i <= 35; i++) {
            loginData.push({
                status: i % 5 === 0 ? 'Failed' : 'Success',
                statusClass: i % 5 === 0 ? 'bg-red-100 text-red-600' : 'bg-[#D1FAE5] text-[#059669]',
                dateTime: `04-${(30 - i % 28).toString().padStart(2, '0')}-2026 . 10:15 AM`,
                relativeTime: `${i} days ago`,
                ip: `192.168.1.${i}`,
                browser: i % 3 === 0 ? 'Firefox' : (i % 3 === 1 ? 'Safari' : 'Chrome'),
                os: i % 3 === 1 ? 'iOS' : 'Windows',
                device: i % 3 === 1 ? 'Mobile' : 'Desktop'
            });
        }

        let currentLoginPage = 1;
        const loginRowsPerPage = 10;

        const renderLoginTable = () => {
            const $tbody = $('.table-card table tbody');
            if ($tbody.length) {
                $tbody.empty();

                const start = (currentLoginPage - 1) * loginRowsPerPage;
                const end = start + loginRowsPerPage;
                const paginatedData = loginData.slice(start, end);

                $.each(paginatedData, function (index, item) {
                    const $tr = $('<tr></tr>');
                    $tr.addClass('border-b border-[#F1F5F9] hover:bg-slate-50 transition-colors');
                    $tr.html(`
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex items-center px-3 py-1 rounded-full ${item.statusClass} text-[13px] font-medium">${item.status}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-[14px] font-medium text-[#64748B]">${item.dateTime}</div>
                            <div class="text-[13px] text-[#94A3B8] mt-0.5">${item.relativeTime}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-[#64748B]">${item.ip}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-[#64748B]">${item.browser}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-[#64748B]">${item.os}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-[#64748B]">${item.device}</td>
                    `);
                    $tbody.append($tr);
                });
            }

            $('#pagination-container').setupPagination({
                totalItems: loginData.length,
                itemsPerPage: loginRowsPerPage,
                currentPage: currentLoginPage,
                infoSelector: '#pagination-info',
                isMobile: $(window).width() < 475,
                onPageChange: function (newPage) {
                    currentLoginPage = newPage;
                    renderLoginTable();
                }
            });
        };

        renderLoginTable();
    }

    // ==========================================
    // Create Parcel Page Tab Switcher
    // ==========================================
    if ($('.create-parcel-tab').length) {
        $('.create-parcel-tab button').on('click', function (e) {
            e.preventDefault();
            const tabId = $(this).attr('id');

            // 1. Update button classes to highlight active tab
            $('.create-parcel-tab button')
                .removeClass('bg-[#003EB7] text-white shadow-lg shadow-blue-100')
                .addClass('text-[#64748B] hover:bg-slate-50');

            $(this)
                .removeClass('text-[#64748B] hover:bg-slate-50')
                .addClass('bg-[#003EB7] text-white shadow-lg shadow-blue-100');

            // 2. Hide all form containers first
            $('.create-parcel-form-content').hide();

            // 3. Show matching form container
            if (tabId === 'tab-regular') {
                $('#regular-form-container').fadeIn(250);
            } else if (tabId === 'tab-express') {
                $('#express-form-container').fadeIn(250);
            } else if (tabId === 'tab-pick-drop') {
                $('#pick-drop-form-container').fadeIn(250);
            }
        });
    }

    // ==========================================================================
    // PERFECTLY RESPONSIVE HEADER INTERACTIONS
    // ==========================================================================

    // Mobile Search Box Focus Helper
    $(document).on('click', '.top-bar .search-box', function (e) {
        if ($(window).width() <= 768) {
            const $input = $(this).find('input');
            if (e.target !== $input[0]) {
                $input.focus();
            }
        }
    });

    // Mobile Dropdowns Toggle Logic (Taps/Clicks on Mobile/Tablet)
    $(document).on('click', function (e) {
        const $target = $(e.target);

        // Notification bell click toggle
        if ($target.closest('.notification-bell').length) {
            if ($(window).width() <= 992) {
                const $bell = $target.closest('.notification-bell');
                const $dropdown = $bell.find('.notification-dropdown');

                if ($dropdown.hasClass('show-mobile')) {
                    $dropdown.removeClass('show-mobile');
                } else {
                    $('.profile-dropdown').removeClass('show-mobile');
                    $dropdown.addClass('show-mobile');
                }
                e.stopPropagation();
            }
        }
        // User profile click toggle
        else if ($target.closest('.user-profile').length) {
            if ($(window).width() <= 992) {
                const $profile = $target.closest('.user-profile');
                const $dropdown = $profile.find('.profile-dropdown');

                if ($dropdown.hasClass('show-mobile')) {
                    $dropdown.removeClass('show-mobile');
                } else {
                    $('.notification-dropdown').removeClass('show-mobile');
                    $dropdown.addClass('show-mobile');
                }
                e.stopPropagation();
            }
        }
        // Click outside closes all
        else {
            $('.notification-dropdown, .profile-dropdown').removeClass('show-mobile');
        }
    });

    // ==========================================
    // My Orders Page Pagination Logic
    // ==========================================
    if ($('#my-order-table-body').length) {
        const statusList = [
            { text: 'Delivered', bg: '#DCFCE7', color: '#16A34A' },
            { text: 'Pending', bg: '#FFEDD5', color: '#EA580C' },
            { text: 'Cancelled', bg: '#FEE2E2', color: '#EF4444' },
            { text: 'In Transit', bg: '#DBEAFE', color: '#2563EB' }
        ];
        const merchants = ['ShopEase', 'QuickBuy', 'BD Mart', 'EasyShop', 'Daraz', 'Aarong'];
        const customers = ['Rahim Uddin', 'Karim Hasan', 'Nusrat Jahan', 'Tanvir Ahmed', 'Sadia Islam', 'Rafiqul Islam', 'Mousumi Akter', 'Ariful Haq'];
        const addresses = ['Dhaka, Bangladesh', 'Chittagong', 'Sylhet, Bangladesh', 'Khulna, Bangladesh', 'Rajshahi', 'Barisal'];
        const trackCodes = ['TRK5821A9', 'TRK5821B1', 'TRK5821C3', 'TRK5821D7', 'TRK5821E2', 'TRK5821F5'];

        // Build 45 sample rows
        const myOrderData = [];
        for (let i = 1; i <= 45; i++) {
            const s = statusList[i % statusList.length];
            myOrderData.push({
                sl: i.toString().padStart(2, '0'),
                date: 'Apr 21, 2026',
                ago: `${(i % 60) + 1} min ago`,
                tracking: trackCodes[i % trackCodes.length] + i,
                customer: customers[i % customers.length],
                address: addresses[i % addresses.length],
                cod: `${(Math.floor(Math.random() * 15) + 5) * 100} $`,
                merchant: merchants[i % merchants.length],
                status: s
            });
        }

        let myOrderCurrentPage = 1;
        const myOrderRowsPerPage = 15;

        const renderMyOrderTable = () => {
            const $tbody = $('#my-order-table-body');
            $tbody.empty();

            const start = (myOrderCurrentPage - 1) * myOrderRowsPerPage;
            const pageItems = myOrderData.slice(start, start + myOrderRowsPerPage);

            $.each(pageItems, function (_, item) {
                $tbody.append(`
                    <tr class="border-b border-[#F1F5F9] last:border-none hover:bg-slate-50/50 transition-colors">
                        <td class="px-6 py-5 text-[14px] font-medium text-[#64748B]">${item.sl}</td>
                        <td class="px-6 py-5">
                            <div class="text-[14px] font-medium text-[#64748B]">${item.date}</div>
                            <div class="text-[13px] text-[#94A3B8] mt-1">${item.ago}</div>
                        </td>
                        <td class="px-6 py-5 text-[14px] font-medium text-[#64748B]">${item.tracking}</td>
                        <td class="px-6 py-5 text-[14px] font-medium text-[#64748B]">${item.customer}</td>
                        <td class="px-6 py-5 text-[14px] font-medium text-[#64748B]">${item.address}</td>
                        <td class="px-6 py-5 text-[14px] font-medium text-[#475569]">${item.cod}</td>
                        <td class="px-6 py-5 text-[14px] font-medium text-[#64748B]">${item.merchant}</td>
                        <td class="px-6 py-5 text-center">
                            <span class="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[13px] font-medium"
                                  style="background:${item.status.bg};color:${item.status.color}">${item.status.text}</span>
                        </td>
                        <td class="px-6 py-5 text-center">
                            <a href="#" class="track-btn text-[14px] font-medium text-[#2563EB] hover:text-[#1D4ED8] underline decoration-1 underline-offset-2">Track</a>
                        </td>
                    </tr>
                `);
            });

            $('#my-order-pagination-container').setupPagination({
                totalItems: myOrderData.length,
                itemsPerPage: myOrderRowsPerPage,
                currentPage: myOrderCurrentPage,
                infoSelector: '#my-order-pagination-info',
                isMobile: $(window).width() < 475,
                onPageChange: function (newPage) {
                    myOrderCurrentPage = newPage;
                    renderMyOrderTable();
                }
            });
        };

        renderMyOrderTable();

        // Track view toggle
        $('#my-order-table-body').on('click', '.track-btn', function (e) {
            e.preventDefault();
            $('#my-orders-list-view').hide();
            $('#my-orders-track-view').show();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        $('#btn-back-to-orders').on('click', function (e) {
            e.preventDefault();
            $('#my-orders-track-view').hide();
            $('#my-orders-list-view').show();
        });

        $(window).on('resize.myorder', function () {
            $('#my-order-pagination-container').setupPagination({
                totalItems: myOrderData.length,
                itemsPerPage: myOrderRowsPerPage,
                currentPage: myOrderCurrentPage,
                infoSelector: '#my-order-pagination-info',
                isMobile: $(window).width() < 475,
                onPageChange: function (newPage) {
                    myOrderCurrentPage = newPage;
                    renderMyOrderTable();
                }
            });
        });
    }

    // ==========================================
    // Pickup Request 2 Page Table Logic
    // ==========================================
    if ($('#pickup-table-body').length) {
        const pickupRequests = [
            {
                date: 'May 7, 2024',
                time: '01:38 PM',
                id: '#1784873',
                address: 'House no 6#, KADdinabag, Rayerbag, kadam toli, DSCC,\nWord no-59, Dhaka Hub: Kadamtoli Hub',
                phone: '',
                status: 'Completed',
                riderName: '',
                riderArea: '',
                riderPhone: ''
            },
            {
                date: 'May 7, 2024',
                time: '01:38 PM',
                id: '#1784873',
                address: 'House no 6#, Modinabag, Rayerbag, kodamtoli, DSCC,\nWord no-59, Dhaka Hub: Kadamtoli Hub',
                phone: 'Phone: +008 58362868548',
                status: 'Assigned',
                riderName: 'Shoriful Islam',
                riderArea: 'Kodamtoli',
                riderPhone: '01941622785'
            },
            {
                date: 'May 7, 2024',
                time: '01:38 PM',
                id: '#1784873',
                address: 'House no 6#, Modinabag, Rayerbag, kodamtoli, DSCC,\nWord no-59, Dhaka Hub: Kadamtoli Hub',
                phone: 'Phone: +008 58362868548',
                status: 'Assigned',
                riderName: 'Shoriful Islam',
                riderArea: 'Kodamtoli',
                riderPhone: '01941622785'
            },
            {
                date: 'May 7, 2024',
                time: '01:38 PM',
                id: '#1784873',
                address: 'House no 6#, Modinabag, Rayerbag, kodamtoli, DSCC,\nWord no-59, Dhaka Hub: Kadamtoli Hub',
                phone: 'Phone: +008 58362868548',
                status: 'Assigned',
                riderName: 'Shoriful Islam',
                riderArea: 'Kodamtoli',
                riderPhone: '01941622785'
            },
            {
                date: 'May 7, 2024',
                time: '01:38 PM',
                id: '#1784873',
                address: 'House no 6#, Modinabag, Rayerbag, kodamtoli, DSCC,\nWord no-59, Dhaka Hub: Kadamtoli Hub',
                phone: 'Phone: +008 58362868548',
                status: 'Assigned',
                riderName: 'Shoriful Islam',
                riderArea: 'Kodamtoli',
                riderPhone: '01941622785'
            },
            {
                date: 'March 1, 2024',
                time: '10:31 AM',
                id: '#1054478',
                address: 'DHUPKHOLA MAm\nGENDARIA S/J\nSASHIBUSHO CHATERGY\nLANE Hub: Sutrapur Hub',
                phone: '',
                status: 'Assigned',
                riderName: 'Shoriful Islam',
                riderArea: 'Kodamtoli',
                riderPhone: '01941622785'
            },
            {
                date: 'Feb 18, 2024',
                time: '03:15 PM',
                id: '#1785200',
                address: 'Flat 4B, Block C, Mirpur-10,\nDhaka Hub: Mirpur Hub',
                phone: 'Phone: +008 58362123456',
                status: 'Assigned',
                riderName: 'Rahul Mia',
                riderArea: 'Mirpur',
                riderPhone: '01712345678'
            },
            {
                date: 'Feb 15, 2024',
                time: '11:00 AM',
                id: '#1785099',
                address: 'House 12, Road 5, Banani,\nDhaka Hub: Banani Hub',
                phone: 'Phone: +008 58367654321',
                status: 'Completed',
                riderName: '',
                riderArea: '',
                riderPhone: ''
            },
            {
                date: 'Feb 10, 2024',
                time: '09:45 AM',
                id: '#1784950',
                address: 'Shop 3, Nawabpur Road,\nDhaka Hub: Gulistan Hub',
                phone: 'Phone: +008 58369988776',
                status: 'Assigned',
                riderName: 'Karim Hossain',
                riderArea: 'Gulistan',
                riderPhone: '01811223344'
            },
            {
                date: 'Jan 28, 2024',
                time: '02:20 PM',
                id: '#1784801',
                address: 'Plot 8, Sector 7, Uttara,\nDhaka Hub: Uttara Hub',
                phone: '',
                status: 'Completed',
                riderName: '',
                riderArea: '',
                riderPhone: ''
            },
            {
                date: 'Jan 20, 2024',
                time: '04:10 PM',
                id: '#1784710',
                address: 'House 25, Dhanmondi 27,\nDhaka Hub: Dhanmondi Hub',
                phone: 'Phone: +008 58361122334',
                status: 'Assigned',
                riderName: 'Nasim Uddin',
                riderArea: 'Dhanmondi',
                riderPhone: '01955667788'
            },
            {
                date: 'Jan 14, 2024',
                time: '12:30 PM',
                id: '#1784622',
                address: 'Flat 2A, Eskaton Garden,\nDhaka Hub: Moghbazar Hub',
                phone: 'Phone: +008 58365544332',
                status: 'Assigned',
                riderName: 'Shoriful Islam',
                riderArea: 'Kodamtoli',
                riderPhone: '01941622785'
            },
        ];

        let pickupCurrentPage = 1;
        const pickupRowsPerPage = 10;

        const getStatusBadge = (status) => {
            if (status === 'Completed') {
                return `<span style="display:inline-flex;align-items:center;justify-content:center;padding:5px 16px;border-radius:999px;background:#D1FAE5;color:#059669;font-size:13px;font-weight:500;white-space:nowrap;">${status}</span>`;
            } else if (status === 'Assigned') {
                return `<span style="display:inline-flex;align-items:center;justify-content:center;padding:5px 16px;border-radius:999px;background:#DBEAFE;color:#2563EB;font-size:13px;font-weight:500;white-space:nowrap;">${status}</span>`;
            }
            return `<span style="display:inline-flex;align-items:center;justify-content:center;padding:5px 16px;border-radius:999px;background:#F1F5F9;color:#64748B;font-size:13px;font-weight:500;white-space:nowrap;">${status}</span>`;
        };

        const getRiderCell = (item) => {
            if (!item.riderName) {
                return `<span style="font-size:14px;color:#94A3B8;">Unassigned</span>`;
            }
            return `
                <div style="font-size:14px;font-weight:500;color:#1E293B;">${item.riderName}</div>
                <div style="font-size:13px;color:#64748B;margin-top:2px;">${item.riderArea}</div>
                <div style="font-size:13px;color:#64748B;">${item.riderPhone}</div>
            `;
        };

        const renderPickupTable = () => {
            const $tbody = $('#pickup-table-body');
            $tbody.empty();

            const start = (pickupCurrentPage - 1) * pickupRowsPerPage;
            const pageItems = pickupRequests.slice(start, start + pickupRowsPerPage);

            $.each(pageItems, function (_, item) {
                const addressLines = item.address.split('\n').join('<br>');
                const phoneHtml = item.phone ? `<div style="font-size:13px;color:#64748B;margin-top:3px;">${item.phone}</div>` : '';

                $tbody.append(`
                    <tr class="border-b border-[#F1F5F9] last:border-none hover:bg-slate-50/50 transition-colors">
                        <td class="px-6 py-5">
                            <div style="font-size:14px;font-weight:500;color:#1E293B;">${item.date}</div>
                            <div style="font-size:13px;color:#64748B;margin-top:2px;">${item.time}</div>
                            <div style="font-size:13px;color:#94A3B8;margin-top:1px;">${item.id}</div>
                        </td>
                        <td class="px-6 py-5" style="max-width:280px;">
                            <div style="font-size:14px;color:#374151;line-height:1.5;">${addressLines}</div>
                            ${phoneHtml}
                        </td>
                        <td class="px-6 py-5">
                            ${getStatusBadge(item.status)}
                        </td>
                        <td class="px-6 py-5">
                            ${getRiderCell(item)}
                        </td>
                    </tr>
                `);
            });

            $('#pickup-pagination-container').setupPagination({
                totalItems: pickupRequests.length,
                itemsPerPage: pickupRowsPerPage,
                currentPage: pickupCurrentPage,
                infoSelector: '#pickup-pagination-info',
                isMobile: $(window).width() < 475,
                onPageChange: function (newPage) {
                    pickupCurrentPage = newPage;
                    renderPickupTable();
                }
            });
        };

        renderPickupTable();

        $(window).on('resize.pickup', function () {
            $('#pickup-pagination-container').setupPagination({
                totalItems: pickupRequests.length,
                itemsPerPage: pickupRowsPerPage,
                currentPage: pickupCurrentPage,
                infoSelector: '#pickup-pagination-info',
                isMobile: $(window).width() < 475,
                onPageChange: function (newPage) {
                    pickupCurrentPage = newPage;
                    renderPickupTable();
                }
            });
        });
    }

    // ==========================================
    // Pickup Type Card Click Navigation
    // ==========================================
    // If we are on pickup-request.html (no table body), clicking a card
    // navigates to pickup-request2.html with the type as a query param.
    // If we are on pickup-request2.html (table body present), clicking
    // a card highlights it as the active selection.
    if ($('.pickup-type-card').length) {
        if (!$('#pickup-table-body').length) {
            // pickup-request.html — navigate on click
            $(document).on('click', '.pickup-type-card', function () {
                const type = encodeURIComponent($(this).data('pickup-type') || 'Regular');
                window.location.href = 'pickup-request2.html?type=' + type;
            });
        } else {
            // pickup-request2.html — highlight active card on click
            $(document).on('click', '.pickup-type-card', function () {
                $('.pickup-type-card').css({
                    'border-color': '#F1F5F9',
                    'box-shadow': '0 2px 10px -4px rgba(0,0,0,0.05)'
                });
                $(this).css({
                    'border-color': '#003EB7',
                    'box-shadow': '0 4px 16px -4px rgba(0,62,183,0.18)'
                });
            });

            // Highlight the card matching the URL query param on load
            const urlParams = new URLSearchParams(window.location.search);
            const activeType = urlParams.get('type');
            if (activeType) {
                const $activeCard = $(`.pickup-type-card[data-pickup-type="${activeType}"]`);
                if ($activeCard.length) {
                    $activeCard.css({
                        'border-color': '#003EB7',
                        'box-shadow': '0 4px 16px -4px rgba(0,62,183,0.18)'
                    });
                }
            } else {
                // Default: highlight Regular card
                $('.pickup-type-card[data-pickup-type="Regular"]').css({
                    'border-color': '#003EB7',
                    'box-shadow': '0 4px 16px -4px rgba(0,62,183,0.18)'
                });
            }
        }
    }

    // Mobile Dropdown Toggle Logic
    $('.notification-bell, .user-profile').on('click', function(e) {
        if ($(window).width() <= 992) {
            e.stopPropagation();
            const $dropdown = $(this).find('.notification-dropdown, .profile-dropdown');
            
            // Close other dropdowns
            $('.notification-dropdown, .profile-dropdown').not($dropdown).removeClass('show-mobile');
            
            // Toggle current
            $dropdown.toggleClass('show-mobile');
        }
    });

    // Close dropdowns when clicking outside
    $(document).on('click', function(e) {
        if ($(window).width() <= 992) {
            if (!$(e.target).closest('.notification-bell, .user-profile').length) {
                $('.notification-dropdown, .profile-dropdown').removeClass('show-mobile');
            }
        }
    });
});


