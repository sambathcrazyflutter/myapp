CREATE DEFINER=`root`@`localhost` PROCEDURE `timingDetails`(IN `category` INT, IN `from_T` TIMESTAMP, IN `to_T` TIMESTAMP)
    READS SQL DATA
BEGIN 
		
     IF ( category = 1 )  THEN
     BEGIN
	 
	  SELECT * 
        FROM T8Basic WHERE  ( (info = 1) AND (`created_on` 
         BETWEEN from_T AND to_T ) ) ORDER BY T8Basic.updated_on ASC;
	 
      SELECT * FROM relationship WHERE   ( (info = 1) AND (`created_on` 
        BETWEEN from_T AND to_T ) ) ORDER BY relationship.created_on ASC;
		
		
     END;
     END IF;
     IF ( category = 2 )  THEN
     BEGIN

       SELECT * 
        FROM T8Basic WHERE  ( (inwait = 1) AND (`created_on` 
         BETWEEN from_T AND to_T ) ) ORDER BY T8Basic.updated_on ASC;

       SELECT * FROM relationship WHERE   ( (inwait = 1) AND (`created_on` 
        BETWEEN from_T AND to_T ) ) ORDER BY relationship.created_on ASC;
     END;
     END IF;
     IF ( category = 3 )  THEN
     BEGIN

       SELECT * 
        FROM T8Basic WHERE  ( (plan = 1) AND (`created_on` 
         BETWEEN from_T AND to_T ) ) ORDER BY T8Basic.updated_on ASC;

       SELECT * FROM relationship WHERE   ( (plan = 1) AND (`created_on` 
        BETWEEN from_T AND to_T ) ) ORDER BY relationship.created_on ASC;
     END;
     END IF;
     IF ( category = 4 )  THEN
     BEGIN

       SELECT * 
        FROM T8Basic WHERE  ( (closer = 1) AND (`created_on` 
         BETWEEN from_T AND to_T ) ) ORDER BY T8Basic.updated_on ASC;

       SELECT * FROM relationship WHERE   ( (closer = 1) AND (`created_on` 
        BETWEEN from_T AND to_T ) ) ORDER BY relationship.created_on ASC;
     END;
     END IF;
     IF ( category = 5 )  THEN
     BEGIN

       SELECT * 
        FROM T8Basic WHERE  ( (rejected = 1) AND (`created_on` 
         BETWEEN from_T AND to_T ) ) ORDER BY T8Basic.updated_on ASC;

       SELECT * FROM relationship WHERE   ( (rejected = 1) AND (`created_on` 
        BETWEEN from_T AND to_T ) ) ORDER BY relationship.created_on ASC;
     END;
     END IF;
     IF ( category = 6 )  THEN
     BEGIN
	 
	 SELECT * 
        FROM T8Basic WHERE 0 = 1;
	 
	 
       SELECT * FROM relationship WHERE  `created_on` 
        BETWEEN from_T AND to_T  ORDER BY relationship.created_on ASC;
     END;
     END IF; 
	 IF ( category = 7 )  THEN
     BEGIN

     Select g.id,g.uv,g.plan,g.info,b.parable,b.business,b.question,b.twentyfist,b.copy,k.dvd,k.financial,k.welcome,k.qnet,g.earning,g.dream,g.week,g.goal,g.percentage,g.created_on FROM Goal g
     Inner join Knowledge k on g.kid = k.id
     Inner join Book b on b.id =  k.bid WHERE ((g.goal = 1) AND  (g.created_on BETWEEN from_T AND to_T))  ORDER BY g.id DESC ;
	
	 END;
     END IF;
	 IF ( category = 8 )  THEN
     BEGIN
	 
	 SELECT * FROM `one108` WHERE created_on BETWEEN from_T AND to_T ORDER BY created_on DESC;
	 
	 END;
     END IF;
	 
     END