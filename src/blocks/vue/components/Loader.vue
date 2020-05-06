<template>
    <div class="loader">
        <div class="lds-dual-ring"></div>
    </div>
</template>

<style>
.lds-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
    text-align: center;
    margin: auto;
}
.lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #cef;
    border-color: #cef transparent #cef transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.loader {
    display: flex;
    align-items: center;
    width: 100%;
}
</style>
