$(document).ready(function() {
    const itemsPerPage = 10;
    let currentPage = 1;
    const totalItems = 200; // Total number of products
    
    // Generate more sample product data for demonstration
    function generateSampleData() {
        const tbody = $('.orders-table tbody');
        const productNames = ['fruit-1', 'fruit-2', 'fruit-3', 'fruit-4', 'fruit-5',
                            'fruit-6', 'fruit-7', 'fruit-8', 'fruit-9'];
        
        const productCodes = ['FR-001', 'FR-002', 'FR-003', 'FR-004', 'FR-005', 'FR-006', 'FR-007', 'FR-008', 'FR-009', 'FR-010',
                            'FR-011', 'FR-012', 'FR-013', 'FR-014', 'FR-015'];
        
        const categories = ['Fruits', 'Vegetables', 'Organic', 'Tropical', 'Seasonal'];
        
        tbody.empty();
        
        for (let i = 1; i <= totalItems; i++) {
            const productName = productNames[Math.floor(Math.random() * productNames.length)];
            const productCode = productCodes[Math.floor(Math.random() * productCodes.length)] || `FR-${String(i).padStart(3, '0')}`;
            const category = categories[Math.floor(Math.random() * categories.length)];
            const price = (Math.random() * 50 + 5).toFixed(2);
            const stock = Math.floor(Math.random() * 100) + 1;
            
            const row = `
                <tr>
                    <td>${i}</td>
                    <td>
                        <div class="flex items-center gap-[16px]">
                            <img src="../assets/images/fruit-${((i - 1) % 9) + 1}.png" alt="fruit-${((i - 1) % 9) + 1}">
                            <span>${productName}</span>
                        </div>
                    </td>
                    <td>${productCode}</td>
                    <td>#${String(i).padStart(9, '0')}</td>
                    <td>${category}</td>
                    <td>$${price}</td>
                    <td>${stock}</td>
                    <td>
                        <div class="flex gap-2">
                            <button class="action-btn delete-btn ">
                                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.125 3.375L12.6602 10.8938C12.5415 12.8148 12.4821 13.7753 12.0006 14.4659C11.7625 14.8073 11.456 15.0955 11.1005 15.312C10.3816 15.75 9.41924 15.75 7.49456 15.75C5.56734 15.75 4.60373 15.75 3.88429 15.3112C3.5286 15.0943 3.222 14.8056 2.98401 14.4636C2.50266 13.7719 2.44459 12.8101 2.32846 10.8864L1.875 3.375" stroke="#545454" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M0.75 3.375H14.25M10.5418 3.375L10.0298 2.3188C9.68968 1.61719 9.51963 1.26639 9.22628 1.0476C9.16122 0.999075 9.09232 0.955907 9.02027 0.918526C8.69543 0.75 8.30559 0.75 7.5259 0.75C6.72662 0.75 6.32699 0.75 5.99676 0.92559C5.92357 0.964506 5.85374 1.00942 5.78797 1.05988C5.49123 1.28753 5.32547 1.65116 4.99395 2.37844L4.53969 3.375" stroke="#545454" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M5.625 11.625L5.625 7.125" stroke="#545454" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M9.375 11.625L9.375 7.125" stroke="#545454" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </button>
                            <button class="action-btn edit-btn">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.99204 9H8.99878" stroke="#545454" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.98423 13.5H8.99097" stroke="#545454" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.99986 4.5H9.00659" stroke="#545454" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            tbody.append(row);
        }
    }
    
    // Initialize with sample data
    generateSampleData();
    
    // Edit button click handler
    $(document).on('click', '.action-btn:first-child', function() {
        // Open edit modal from left side
        console.log('Edit modal opened from left side');
        // Add your modal opening logic here
        $('.edit-modal').addClass('modal-open-left').show();
    });
    
    // Delete button click handler
    $(document).on('click', '.delete-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get the current row
        const currentRow = $(this).closest('tr');
        const productId = currentRow.find('td:eq(3)').text(); // Product ID column
        const productName = currentRow.find('td:eq(1) span').text(); // Product name
        
        // Show delete modal popup as shown in picture
        console.log('Delete modal triggered for:', productId, productName);
        
        // Show delete modal from left side
        $('.delete-modal').addClass('modal-open-left').show();
        
        // Populate modal with product info
        $('.delete-modal .product-id').text(productId);
        $('.delete-modal .product-name').text(productName);
    });
    
    // Close modal button handler
    $(document).on('click', '.close-modal', function() {
        $('.delete-modal').removeClass('modal-open-left').hide();
    });
    
    // Close modal when clicking outside
    $(document).on('click', '.delete-modal', function(e) {
        // Check if the click is on the modal background (not on the modal content)
        if (e.target === this) {
            $('.delete-modal').removeClass('modal-open-left').hide();
        }
    });
    
    // Cancel button handler
    $(document).on('click', '.cancel-btn', function() {
        $('.delete-modal').removeClass('modal-open-left').hide();
    });
    
    // Confirm delete button handler
    $(document).on('click', '.confirm-delete-btn', function() {
        const productId = $('.delete-modal .product-id').text();
        const productName = $('.delete-modal .product-name').text();
        
        console.log('Confirmed delete for:', productId, productName);
        
        // Find and remove the row with animation
        $(`.orders-table tbody tr`).each(function() {
            if ($(this).find('td:eq(3)').text() === productId) {
                $(this).css({
                    'opacity': '0',
                    'transform': 'translateX(-100%)',
                    'transition': 'all 0.3s ease-out'
                });
                
                setTimeout(() => {
                    $(this).remove();
                    // Update item count and pagination
                    const remainingItems = $('.orders-table tbody tr').length;
                    $('.item-count').text(`${remainingItems} items remaining`);
                }, 300);
            }
        });
        
        // Close modal
        $('.delete-modal').removeClass('modal-open-left').hide();
    });
    
    function showPage(page) {
        const rows = $('.orders-table tbody tr');
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        // Hide all rows immediately
        rows.hide();
        
        // Show new rows with animation
        const newRows = rows.slice(startIndex, endIndex);
        newRows.css({
            'opacity': '0',
            'transform': 'translateY(-30px)',
            'transition': 'all 0.4s ease-out'
        }).show();
        
        // Animate to normal position
        setTimeout(() => {
            newRows.css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 50);
        
        updatePaginationInfo(page);
        updatePaginationControls(page);
    }
    
    function updatePaginationInfo(page) {
        const startIndex = (page - 1) * itemsPerPage + 1;
        const endIndex = Math.min(page * itemsPerPage, totalItems);
        $('.item-count').text(`${startIndex}-${endIndex} of ${totalItems} items`);
    }
    
    function updatePaginationControls(page) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const paginationControls = $('.pagination-controls');
        
        // Remove only page number buttons (keep first and last - arrows)
        paginationControls.find('.pagination-btn').slice(1, -1).remove();
        
        // Determine which page numbers to show
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        // Add page number buttons before right arrow
        for (let i = startPage; i <= endPage; i++) {
            const button = $(`<button class="pagination-btn">${i}</button>`);
            if (i === page) {
                button.addClass('active');
            }
            paginationControls.find('.pagination-btn:last').before(button);
        }
        
        // Disable left arrow on first page
        $('.pagination-btn:first').prop('disabled', page === 1);
        
        // Disable right arrow on last page
        $('.pagination-btn:last').prop('disabled', page === totalPages);
    }
    
    // Initial page display
    showPage(1);
    
    // Pagination button click handlers
    $('.pagination-controls').on('click', '.pagination-btn', function() {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        // Check if it's left arrow (has chevron-left icon)
        if ($(this).find('.fa-chevron-left').length > 0) {
            // Left arrow - go to previous page
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        }
        // Check if it's right arrow (has chevron-right icon)
        else if ($(this).find('.fa-chevron-right').length > 0) {
            // Right arrow - go to next page
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        }
        // Check if it's a page number button
        else {
            // Page number button - go to that page
            const pageNum = parseInt($(this).text());
            if (!isNaN(pageNum)) {
                currentPage = pageNum;
                showPage(currentPage);
            }
        }
    });
    
    // Items per page change functionality
    $('.pagination-info span:first').text(`${itemsPerPage} items per page`);
});
