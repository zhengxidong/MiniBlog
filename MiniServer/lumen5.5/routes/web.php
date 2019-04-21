<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api/v1'], function($router)
{
    #$app->post('car','CarController@createCar');
    #$app->put('car/{id}','CarController@updateCar');
    #$app->delete('car/{id}','CarController@deleteCar');
    #$router->get('article','ArticleController@index');
    $router->get('article/{cateId}','ArticleController@articleList');      //按分类获取文章
    $router->get('article/detail/{articleId}','ArticleController@detail'); //获取文章详情
});


$router->get('/', function () use ($router) {
    return $router->app->version();
});
