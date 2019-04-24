<?php
namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{

    /******************操作demo***************/
    public function createCar(Request $request)
    {
        $car = Car::create($request->all());
        return response()->json($car);
    }

    public function updateCar(Request $request, $id)
    {
        $car = Car::find($id);
        $car->make = $request->input('make');
        $car->model = $request->input('model');
        $car->year = $request->input('year');
        $car->save();

        return response()->json($car);
    }

    public function deleteCar($id)
    {
        $car = Car::find($id);
        $car->delete();

        return response()->json('删除成功');
    }
    public function index()
    {
        $cars = Car::all();
        return response()->json($cars);
    }
    /*******************真实操作**************/

    //按分类获取文章列表
    public function articleList($cateId)
    {
	if($cateId == 1)
        {

        $articleList = DB::table('bg_article as a')
        ->leftJoin('bg_cate as c','a.cate_id','=','c.cate_id')
        ->select('a.id','a.article_title','a.article_code','a.comment_count','a.article_views','a.article_like','a.article_date')
        ->where([['a.article_status','open']])
        ->orderBy('a.id','desc')
        ->get();
        }else {

        $articleList = DB::table('bg_article as a')
        ->leftJoin('bg_cate as c','a.cate_id','=','c.cate_id')
        ->select('a.id','a.article_title','a.article_code','a.comment_count','a.article_views','a.article_like','a.article_date')
        ->where([['a.article_status','open'],['a.cate_id',$cateId]])
        ->orderBy('a.id','desc')
        ->get();
        }


	$tempArticle = [];
        //处理文章内容
        foreach($articleList as $value){

        //var_dump($value->article_code);
        //exit;
                $articleContent = $value->article_code;
                $newArticleContent = '';
                if(!empty($value->article_code))
                {

                        $newArticleContent = preg_replace('#<div class="markdown-toc editormd-markdown-toc">\[TOC\]</div>#','',$value->article_code);
                }

                $data = [

                  'articleId'      => $value->id,
                  'articleTitle'   => $value->article_title,
                  'articleContent' => (empty($newArticleContent)) ? $articleContent : $newArticleContent,
                  'commentCount'   => $value->comment_count,
                  'articleViews'   => $value->article_views,
                  'articleLike'    => $value->article_like,
                  'articleDate'    => date('Y-m-d',strtotime($value->article_date))
                ];
                $tempArticle[] = $data;
        }
        return response()->json($tempArticle);
    }
    //获取文章详情
    public function detail($articleId)
    {

        $articleDetail = Article::find($articleId);
        $articleContent = preg_replace('#<div class="markdown-toc editormd-markdown-toc">\[TOC\]</div>#','',$articleDetail['article_code']);
        $newArticleDetail = [
                'articleId'      => $articleDetail['id'],
                  'articleTitle'   => $articleDetail['article_title'],
                  'articleContent' => $articleContent,
                'commentCount'   => $articleDetail['comment_count'],
                  'articleViews'   => $articleDetail['article_views'],
                  'articleLike'    => $articleDetail['article_like'],
                  'articleDate'    => date('Y-m-d',strtotime($articleDetail['article_date']))
        ];
        return response()->json($newArticleDetail);
    }
}
