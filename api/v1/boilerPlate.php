<?php

//echo substr("tudil_user_first_name",6);
// require_once __DIR__.'/settings.php';

// $input = 'Hi_i_am_working_on_javascript_comment_box';

// $output = str_replace('_', '', $input);

// //echo $output;

// $str = "tudil_user_id";
// $removeInitials = substr($str, 6);
// $new_str = lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $removeInitials))));

// echo $new_str;   

// $date = "2017-08-31";
// $date1 = str_replace('-', '/', $date);
// $tomorrow = date('Y-m-Y',strtotime($date1 . "+1 days"));

// echo $tomorrow;

// $userinfo = "Paul jacked up his car to find out the problem was with his brakes.";
//    preg_match_all ('/\b.*?\b\s/', $userinfo, $pat_array);
   
//    print json_encode($pat_array);

    class StringUtilityLib {
        private $filteredWordList = null;
        private $sentences = null;

        function __construct() {
            
        }
    
        function __destruct() {
            
        }

        public function matchWordsInASentence($filteredWordList, $sentences)
        {
            $this->filteredWordList = $filteredWordList;
            $this->sentences = $sentences;

            $extractWordsFromSentence = $this->extractWordsFromSentence($this->sentences);

            //echo json_encode($extractWordsFromSentence);
            
            $findMatchWords = $this->findMatchWords($extractWordsFromSentence);

            return $this->concatinateMatchdWords($findMatchWords);

        }



        private function extractWordsFromSentence($sentence)
        {
            $string  = $sentence;

            $string = preg_replace('/\s\s+/i', '', $sentence); // replace whitespace
            $string = trim($sentence); // trim the string
            $string = preg_replace('/[^a-zA-Z0-9 -]/', '', $sentence); // only take alphanumerical characters, but keep the spaces and dashes too…
            $string = strtolower($string); // make it lowercase

            $arrayOfWords = explode(" ", $string);

            return $arrayOfWords;
        }

        private function findMatchWords($wordsInSentence)
        {
            $foundMatchedWords = array();

            foreach ($this->filteredWordList as $filteredWord) 
            {
                
                foreach ($wordsInSentence as $word) 
                {
                    if(strtolower($filteredWord) == $word)
                    {
                        $foundMatchedWords[] = ucwords($word);
                    }
                }
            }

            $foundMatchedWords = array_unique($foundMatchedWords);

            return $foundMatchedWords;
        }

        private function concatinateMatchdWords($words)
        {
            $string = null;

            if($words)
            {
                $string = null;

                $recordPointer = 0;
                foreach ($words as $key) 
                {
                    $recordPointer++;

                    if($recordPointer == count($words))
                    {
                        $string.= ucwords($key);
                    }
                    else{
                        $string.= ucwords($key).", ";
                    }
                }

                $string = implode(', ', array_values($words));
            }
            else{
                //
            }

            return $string;
        }

            // foreach ($input as $key) {
            // echo $key.'<br>';
            // $string  = $key;
            // $string = preg_replace('/\s\s+/i', '', $string); // replace whitespace
            // //$string = trim($string); // trim the string
            // $string = preg_replace('/[^a-zA-Z0-9 -]/', '', $string); // only take alphanumerical characters, but keep the spaces and dashes too…
            // $string = strtolower($string); // make it lowercase

            // $array_of_words = explode(" ", $string);
            // //echo json_encode($array_of_words).'<br>';

            // //preg_match_all ('/\b.*?\b\s/', $key, $array_of_words);

            // //$array_of_words = $array_of_words[0];
            
            // $foundMatchedWords = array();

            // foreach ($word_list as $word) {
            //     //echo $word;
            //     foreach ($array_of_words as $wordInSentence) 
            //     {
            //         if(strtolower($wordInSentence) == $word)
            //         {
            //             $foundMatchedWords[] = ucwords($wordInSentence);
            //         }
            //     }
            // }

            // $foundMatchedWords = array_unique($foundMatchedWords);

            // if($foundMatchedWords)
            // {
            //     $string = null;

            //     $recordPointer = 0;
            //     foreach ($foundMatchedWords as $key) 
            //     {
            //         $recordPointer++;

            //         if($recordPointer == count($foundMatchedWords))
            //         {
            //             $string.= ucwords($key);
            //         }
            //         else{
            //             $string.= ucwords($key).", ";
            //         }
            //     }

            //     echo "This string contained the words: ".implode(', ', array_values($foundMatchedWords));
            // }
            // else{
            //     echo "This string does not contain any word";
            // }


    }

$input = array(
    "Sam was going to the store to pick up some milk, ice, and chips.",
    "Jack was serious when he was buying that new computer, he got an 8088!",
);


$word_list = array(
    'jack',
    'serious',
    'hill',
    'ice',
    'computer',
);

$StringUtilityLib = new StringUtilityLib();

echo "Word List : ".implode(', ', array_values($word_list))."<br><br>";

foreach ($input as $sentence) {
    echo "Sentence : ".$sentence."<br>";
    $matchWordsInASentence = $StringUtilityLib->matchWordsInASentence($word_list, $sentence);
    if($matchWordsInASentence)
    {
        echo "This string contained the words: ".$matchWordsInASentence;
    }
    else{
        echo "This string does not match any words";
    }
    echo "<br><br>";
}

?>