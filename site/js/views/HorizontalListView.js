$js.compile("HorizontalListView", ListView, function($public, $private, $protected, $self) {

    $private.field.side = "left";
    $public.delegate.setSide = function(_side) { $self.side = _side; return $self; };

    $private.func.padding = 0;
    $public.delegate.setItemPadding = function(_padding) { $self.padding = _padding; return $self; };
    
    $protected.override.func.on_key = function() { return "horizontal-list-view"; };

    $protected.extension.void.on_style = function(_views) {

        _views.container.select_path()
            .begin()
                .relative()
                .heightFull()
                .horizontalScroll()
            .save();

        _views.container.views.item.select_path()
            .begin()
                .relativeLeft()
                .heightFull()
            .save();

    };

    $protected.extension.void.on_self_style = function(_views) {

        _views.container.select()
            .begin()
                .float($self.side)
            .save();

    };

});