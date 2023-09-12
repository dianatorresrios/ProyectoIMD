$(document).ready(function() {
    // Obtener el nombre de la página actual
    var currentPage = window.location.pathname.split('/').pop().split('.')[0];

    // Resaltar la página actual en la barra de navegación
    $("nav ul li a[href='" + currentPage + ".html']").addClass("active");

    // Función para cargar los resultados de la página actual
    function loadResults() {
        // Obtener el valor de búsqueda del input
        var searchTerm = $("#search-input").val();

        // Hacer la solicitud a la API de IMDb 
        $.ajax({
            url: "https://api.imdb.com/search?api_key=my_API_KEY&q=" + searchTerm + "&page=" + currentPage,
            method: "GET",
            dataType: "json",
            success: function(data) {
                // Limpiar los resultados anteriores
                $(".results").empty();

                // Mostrar los resultados en tarjetas
                for (var i = 0; i < data.results.length; i++) {
                    var movie = data.results[i];
                    var card = $("<div class='movie-card'>");
                    card.html("<h2>" + movie.title + "</h2>" + "<p>" + movie.year + "</p>");
                    $(".results").append(card);
                }

                // Actualizar la información de la paginación
                totalPages = data.total_pages;
                $("#page-info").text("Página " + currentPage + " de " + totalPages);
            },
            error: function() {
                // Manejar errores de la solicitud
                $(".results").html("<p>Error al buscar películas. Inténtalo de nuevo más tarde.</p>");
            }
        });
    }

    // Manejar clic en el botón de búsqueda
    $("#search-button").click(function() {
        currentPage = 1; // Reiniciar a la primera página
        loadResults();
    });

    // Manejar clic en el botón "Anterior"
    $("#prev-button").click(function() {
        if (currentPage > 1) {
            currentPage--;
            loadResults();
        }
    });

    // Manejar clic en el botón "Siguiente"
    $("#next-button").click(function() {
        if (currentPage < totalPages) {
            currentPage++;
            loadResults();
        }
    });
});

