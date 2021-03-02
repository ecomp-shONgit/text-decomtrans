# TEXT DECOMPOSITION AND TRANSFORMATION (text-decomtrans)

The software is the second of a triad of software, that is needed to perform various tasks in analyzing strings. The first part of the software is the normalization part, the second (this) the representations level of text and the third part is the definition of equality and distances to implement measures to performe classification of objects of text representative.

1. Input: string representing Text (latin & polytonic greek)

2. Decomposition: split string into syllables, n-grams, n-grams panned, letter-selections, head-body-tail,

3. Transformation: letter transforms, word-selections, stop word masking, vectors/co-occurrence representations

4. Shallow neighbourhood representation 

# EXAMPLES
To get a notion of what the software is good for an how to use it visit this page:

http://ecomparatio.net/~khk/NORM-DECOMP-DIST/zerl.html

To run minimal python test call on commandline: python3 textdecomp.py

# Functions

- ngramWhole: letter ngram for entire string

- ngramWords: letter ngram for wordlevel with/without padding

- genngram: general ngram builder

- silben: pseudo syllable

- ohneKon: sting without consonant

- ohnVoka: string without vowel

- justKLEIN: string of just stopwords

- justGROSZ: string with no stopwords

- toKKC: every word as head, body, tail, equal separation

- toKKCnSufixWords: every word as a array of head, body, tail possible letter sequences

- fnb: shallow neighbourhood representation

- gettransformarray: get a array of a string with letter transformations

# USAGE

Inlcude the textnorm.py if you use this in your Python3 software.
