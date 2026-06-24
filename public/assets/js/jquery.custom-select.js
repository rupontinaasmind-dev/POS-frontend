(function($) {
    $.fn.customSelect = function(options) {
        var settings = $.extend({
            placeholder: 'Select an option',
            search: true,
            width: '100%'
        }, options);

        return this.each(function() {
            var $select = $(this);
            var $wrapper = $('<div class="custom-select-wrapper"></div>');
            var $selected = $('<div class="custom-select-selected"></div>');
            var $options = $('<div class="custom-select-options"></div>');
            var $search = $('<input type="text" class="custom-select-search" placeholder="Search..." style="display:none;">');
            
            // Hide original select
            $select.hide();
            
            // Get selected option text
            function updateSelected() {
                var selectedText = $select.find('option:selected').text() || settings.placeholder;
                $selected.text(selectedText);
            }
            
            // Create options
            function createOptions() {
                $options.empty();
                $select.find('option').each(function() {
                    var $option = $(this);
                    var $customOption = $('<div class="custom-select-option" data-value="' + $option.val() + '">' + $option.text() + '</div>');
                    
                    if ($option.prop('selected')) {
                        $customOption.addClass('selected');
                    }
                    
                    $customOption.on('click', function() {
                        $select.val($option.val()).trigger('change');
                        $options.hide();
                        updateSelected();
                    });
                    
                    $options.append($customOption);
                });
            }
            
            // Build structure
            $wrapper.css('width', settings.width);
            $selected.text(settings.placeholder);
            $wrapper.append($selected);
            $wrapper.append($options);
            $options.append($search);
            
            // Insert after original select
            $select.after($wrapper);
            
            // Initialize
            createOptions();
            updateSelected();
            
            // Toggle dropdown
            $selected.on('click', function(e) {
                e.stopPropagation();
                $('.custom-select-options').not($options).hide();
                $options.toggle();
                if (settings.search) {
                    $search.show().focus();
                }
            });
            
            // Search functionality
            $search.on('input', function() {
                var searchTerm = $(this).val().toLowerCase();
                $('.custom-select-option').each(function() {
                    var text = $(this).text().toLowerCase();
                    $(this).toggle(text.includes(searchTerm));
                });
            });
            
            // Close on outside click
            $(document).on('click', function() {
                $options.hide();
                $search.hide();
            });
            
            // Update on original select change
            $select.on('change', function() {
                createOptions();
                updateSelected();
            });
        });
    };
})(jQuery);
