function activeMenuOption(href) {
    $(".app-menu .nav-link")
    .removeClass("active")
    .removeAttr('aria-current')

    $(`[href="${(href ? href : "#/")}"]`)
    .addClass("active")
    .attr("aria-current", "page")
}

// Hay que modificarlo para el nombre de la aplicacion
const app = angular.module("MimiApp", ["ngRoute"])
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("")

    // y para las rutas
    $routeProvider
    .when("/inicio", {
        templateUrl: "/app",
        controller: "appCtrl"
    })
    .when("/postres", {
        templateUrl: "/postres",
        controller: "postresCtrl"
    })
    .when("/ingredientes", {
        templateUrl: "/ingredientes",
        controller: "ingredientesCtrl"
    })
    .when("/postresingredientes", {
        templateUrl: "/postresingredientes",
        controller: "postresingredientesCtrl"
    })
    .otherwise({
        redirectTo: "/"
    })
})
app.run(["$rootScope", "$location", "$timeout", function($rootScope, $location, $timeout) {
    function actualizarFechaHora() {
        lxFechaHora = DateTime
        .now()
        .setLocale("es")

        $rootScope.angularjsHora = lxFechaHora.toFormat("hh:mm:ss a")
        $timeout(actualizarFechaHora, 1000)
    }

    $rootScope.slide = ""

    actualizarFechaHora()
    activeMenuOption(location.hash)

    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
        $("html").css("overflow-x", "hidden")

        const path = current.$$route.originalPath

        if (path.indexOf("splash") == -1) {
            const active = $(".app-menu .nav-link.active").parent().index()
            const click  = $(`[href^="#${path}"]`).parent().index()

            if (active != click) {
                $rootScope.slide  = "animate__animated animate__faster animate__slideIn"
                $rootScope.slide += ((active > click) ? "Left" : "Right")
            }

            $timeout(function () {
                $("html").css("overflow-x", "auto")

                $rootScope.slide = ""
            }, 1000)

            activeMenuOption(`#${path}`)
        }
    })
}])


app.controller("appCtrl", function ($scope, $http) {

})
app.controller("postresCtrl", function ($scope, $http) {

})
app.controller("ingredientesCtrl", function ($scope, $http) {

})
app.controller("postresingredientesCtrl", function ($scope, $http) {

})

const DateTime = luxon.DateTime
let lxFechaHora

document.addEventListener("DOMContentLoaded", function (event) {
    const configFechaHora = {
        locale: "es",
        weekNumbers: true,
        minuteIncrement: 15,
        altInput: true,
        altFormat: "d/F/Y",
        dateFormat: "Y-m-d",
    }
})
