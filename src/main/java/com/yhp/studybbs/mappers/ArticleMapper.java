package com.yhp.studybbs.mappers;

import com.yhp.studybbs.dtos.ArticleDto;
import com.yhp.studybbs.entities.ArticleEntity;
import com.yhp.studybbs.entities.CommentEntity;
import com.yhp.studybbs.entities.FileEntity;
import com.yhp.studybbs.entities.ImageEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ArticleMapper {
    int insertArticle(ArticleEntity article);

    int insertComment(CommentEntity comment);

    int insertFile(FileEntity file);

    int insertImage(ImageEntity image);

    ArticleEntity selectArticleByIndex(@Param(value = "index") int index);

    ArticleDto selectArticleDtoByIndex(@Param(value = "index") int index);

    FileEntity selectFileByIndex(@Param(value = "index") int index);

    FileEntity selectFileByIndexNoData(@Param(value = "index") int index);

    FileEntity[] selectFilesByArticleIndexNoData(@Param(value = "articleIndex") int articleIndex);

    ImageEntity selectImageByIndex(@Param(value = "index") int index);

    int updateArticle(ArticleEntity article);

    int updateFileNoData(FileEntity file);
}